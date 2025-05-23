import "../ItemDetail/ItemDetail.css";
import ItemCount from '../ItemCount/ItemCount';
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ItemDetail = ({ id, name, price, stock, description, image }) => {
const [quantityAdded, setQuantityAdded] = useState(0)

const { addItem } = useContext(CartContext)

const handleOnAdd = (quantity) => {
  setQuantityAdded(quantity)

  const item = { id, name, price, stock, description, image }

  addItem(item, quantity)
}
  return (
    <div>
      <article className='CardItem'>
        <header className='header'>
          <h2 className='ItemHeader'>{name}</h2>
        </header>
        <picture>
          <img src={image} alt={name} className='ItemImg' />
        </picture>
        <section>
          <p className='Info'>Precio: ${price}</p>
          <p className='Info'>Descripción: {description}</p>
          <p className='Info'>Stock disponible: {stock}</p>
          <footer className='ItemFooter'>
            {
              quantityAdded > 0 ? (
                <Link to="/cart" className='Option'>Terminar compra</Link>
              ) : (
                <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
              )
            }
          </footer>
        </section>
      </article>
    </div>
  );
};

export default ItemDetail;
