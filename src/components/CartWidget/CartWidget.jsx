import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import '../CartWidget/CartWidget.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);

  return (

    <Link to="/cart" className="CartWidget">
    <div className="cart-widget">
      <Badge count={totalQuantity} overflowCount={99} showZero>
        <ShoppingCartOutlined className="cart-icon" />
      </Badge>
    </div>
    </Link>
  );
};

export default CartWidget;
