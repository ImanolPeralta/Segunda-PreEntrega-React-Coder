import './CheckoutForm.css'

const onlyAllowNumbers = (e) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
  if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault()
  }
}

const CheckoutForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3>Datos personales y envío</h3>

      <div className="checkout-section">
        <input
          name="name"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={handleChange}
          required
          className="checkout-full"
        />
        <input
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="^\d{8,15}$"
          title="Debe contener solo números (mínimo 8 dígitos)"
          inputMode="numeric"
          maxLength={15}
          onKeyDown={onlyAllowNumbers}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          title="Debe ser un correo electrónico válido"
        />
        <input
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          required
          className="checkout-full"
        />
        <input
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          name="postalCode"
          placeholder="Código postal"
          value={formData.postalCode}
          onChange={handleChange}
          required
          pattern="^\d{4,10}$"
          title="Debe contener entre 4 y 10 dígitos numéricos"
          inputMode="numeric"
          maxLength={10}
          onKeyDown={onlyAllowNumbers}
        />
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Seleccioná tu país</option>
          <option value="Argentina">Argentina</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Chile">Chile</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Perú">Perú</option>
          <option value="Colombia">Colombia</option>
          <option value="México">México</option>
          <option value="España">España</option>
          <option value="Estados Unidos">Estados Unidos</option>
        </select>
      </div>

      <h3>Método de pago</h3>

      <div className="checkout-section">
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="checkout-full"
        >
          <option value="tarjeta">Tarjeta de crédito/débito</option>
          <option value="transferencia">Transferencia bancaria</option>
          <option value="paypal">PayPal</option>
        </select>

        {formData.paymentMethod === 'tarjeta' && (
          <>
            <input
              name="cardName"
              placeholder="Nombre en la tarjeta"
              value={formData.cardName}
              onChange={handleChange}
              required
              className="checkout-full"
            />
            <input
              name="cardNumber"
              placeholder="Número de tarjeta"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              pattern="^\d{13,19}$"
              title="Número de tarjeta válido (13 a 19 dígitos)"
              inputMode="numeric"
              maxLength={19}
              onKeyDown={onlyAllowNumbers}
            />
            <input
              name="expiryDate"
              placeholder="Fecha de vencimiento (MM/AA)"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              maxLength={5}
              pattern="^(0[1-9]|1[0-2])\/\d{2}$"
              title="Formato MM/AA"
            />
            <input
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              required
              pattern="^\d{3,4}$"
              title="Código de seguridad (3 o 4 dígitos)"
              inputMode="numeric"
              maxLength={4}
              onKeyDown={onlyAllowNumbers}
            />
          </>
        )}
      </div>

      <button type="submit">Finalizar compra</button>
    </form>
  )
}

export default CheckoutForm
