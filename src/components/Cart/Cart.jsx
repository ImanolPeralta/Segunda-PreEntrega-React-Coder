import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, clearCart, totalQuantity, total } = useContext(CartContext);

    if (totalQuantity === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <Link to="/" className="cart-link">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Tu carrito</h2>

            <div className="cart-items">
                {cart.map(p => <CartItem key={p.id} {...p} />)}
            </div>

            <div className="cart-summary">
                <h3>Total: <span>${total}</span></h3>
                <div className="cart-actions">
                    <button onClick={clearCart} className="cart-clear">Limpiar carrito</button>
                    <Link to="/checkout" className="cart-checkout">Finalizar compra</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;