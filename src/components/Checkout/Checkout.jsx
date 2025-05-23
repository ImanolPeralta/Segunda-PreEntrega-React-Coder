import React, { useContext, useState, useEffect, useRef } from 'react'
import { CartContext } from '../../context/CartContext'
import './Checkout.css'
import { db } from '../../main'
import {
  collection,
  writeBatch,
  getDocs,
  query,
  where,
  documentId,
  Timestamp,
  addDoc,
} from 'firebase/firestore'
import Swal from 'sweetalert2'
import CheckoutForm from '../CheckoutForm/CheckoutForm'

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'tarjeta',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const audioRef = useRef(null)

  useEffect(() => {
    // Sonido corto de caja registradora (base64)
    const audioBase64 =
      'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAZGF0YQAAAAA='
    audioRef.current = new Audio(audioBase64)
    audioRef.current.load()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.country
    ) {
      setError('Por favor, completa todos los campos de envío.')
      return false
    }

    if (formData.paymentMethod === 'tarjeta') {
      if (
        !formData.cardName ||
        !formData.cardNumber ||
        !formData.expiryDate ||
        !formData.cvv
      ) {
        setError('Por favor, completa todos los campos de tarjeta.')
        return false
      }
      if (formData.cardNumber.length < 13 || formData.cardNumber.length > 19) {
        setError('Número de tarjeta inválido.')
        return false
      }
      if (formData.cvv.length < 3 || formData.cvv.length > 4) {
        setError('CVV inválido.')
        return false
      }
    }

    setError('')
    return true
  }

  const createOrder = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      const objOrder = {
        buyer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        payment: {
          method: formData.paymentMethod,
          ...(formData.paymentMethod === 'tarjeta' && {
            cardName: formData.cardName,
            cardNumber: '**** **** **** ' + formData.cardNumber.slice(-4),
            expiryDate: formData.expiryDate,
          }),
        },
        items: cart,
        total,
        date: Timestamp.fromDate(new Date()),
      }

      const batch = writeBatch(db)
      const productsRef = collection(db, 'products')
      const ids = cart.map((prod) => prod.id)

      const productsFromFirestore = await getDocs(
        query(productsRef, where(documentId(), 'in', ids))
      )

      const outOfStock = []

      productsFromFirestore.docs.forEach((doc) => {
        const dataDoc = doc.data()
        const stockDb = dataDoc.stock
        const productInCart = cart.find((prod) => prod.id === doc.id)
        const productQuantity = productInCart?.quantity || 0

        if (stockDb >= productQuantity) {
          batch.update(doc.ref, { stock: stockDb - productQuantity })
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc })
        }
      })

      if (outOfStock.length === 0) {
        await batch.commit()
        const orderRef = collection(db, 'orders')
        const orderAdded = await addDoc(orderRef, objOrder)
        setOrderId(orderAdded.id)
        clearCart()
      } else {
        setError(
          'Hay productos fuera de stock: ' +
            outOfStock.map((p) => p.id).join(', ')
        )
      }
    } catch (err) {
      console.error(err)
      setError('Error al crear la orden, intentá nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  // Manejo el submit para reproducir sonido y crear orden
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Reproducir sonido en respuesta a click
    if (audioRef.current) {
      try {
        await audioRef.current.play()
      } catch {
        // Silenciar error si no se puede reproducir
      }
    }
    createOrder()
  }

  useEffect(() => {
    if (orderId) {
      Swal.fire({
        icon: 'success',
        title: '¡Compra realizada con éxito!',
        text: `Tu número de orden es: ${orderId}`,
        confirmButtonText: 'OK',
        timer: 5000,
        timerProgressBar: true,
        showCloseButton: true,
      })
    }
  }, [orderId])

  if (loading) {
    return <h2>Generando su orden, por favor espere...</h2>
  }

  if (orderId) {
    return (
      <div className="order-confirmation">
        <h2>¡Gracias por tu compra!</h2>
        <p>
          Tu número de orden es: <strong>{orderId}</strong>
        </p>
      </div>
    )
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <CheckoutForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Checkout
