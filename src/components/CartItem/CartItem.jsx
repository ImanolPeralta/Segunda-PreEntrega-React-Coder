import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import './CartItem.css';

const CartItem = ({ id, name, price, quantity, image }) => {
    const { removeItem, updateQuantity } = useContext(CartContext);

    const handleIncrease = () => updateQuantity(id, quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) updateQuantity(id, quantity - 1);
    };

    return (
        <div className="cart-item">
            <div className="cart-item-img">
                <img src={image} alt={name} />
            </div>

            <div className="cart-item-info">
                <h4>{name}</h4>
                <p className="price">${price}</p>

                <div className="quantity-controls">
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>

                <p className="subtotal">Subtotal: ${price * quantity}</p>
            </div>

            <button className="remove-btn" onClick={() => removeItem(id)}>
                <FaTrashAlt />
            </button>
        </div>
    );
};

export default CartItem;
