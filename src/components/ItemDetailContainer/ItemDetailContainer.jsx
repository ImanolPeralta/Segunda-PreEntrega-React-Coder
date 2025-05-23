import React, { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/firebase/productService';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        getProductById(itemId)
            .then(response => {
                setProduct(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [itemId]);

    return (
        <div className='ItemDetailContainer'>
            {product && <ItemDetail {...product} />}
        </div>
    );
};

export default ItemDetailContainer;
