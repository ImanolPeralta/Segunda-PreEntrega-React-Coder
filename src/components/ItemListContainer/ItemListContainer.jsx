import { useState, useEffect } from "react";
import {
  getTopProducts,
  getProductsByCategory,
  getProductsBySubcategory,
} from "../services/firebase/productService"

import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import ProductSlider from "../ProductSlider/ProductSlider";
import { ClipLoader } from "react-spinners";
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId, subcategoryId } = useParams();

  let title = "Productos Destacados";

if (subcategoryId) {
  const subcategoryTitles = {
    notebooks: "Notebooks",
    escritorio: "Computadoras de Escritorio",
    monitores: "Monitores",
    gabinetes: "Gabinetes para PC",
    mouses: "Mouses",
    teclados: "Teclados",
    auriculares: "Auriculares",
    escritorios: "Escritorios Ergonómicos",
    sillas: "Sillas Ergonómicas",
    luces: "Luces LED",
    cuadros: "Cuadros Temáticos",
    setup: "Accesorios Decorativos para Setups",
  };
  title = subcategoryTitles[subcategoryId] || "Productos";
} else if (categoryId) {
  const categoryTitles = {
    hardware: "Productos de Hardware",
    accesorios: "Accesorios de Oficina",
    decoracion: "Decoración y Personalización",
  };
  title = categoryTitles[categoryId] || "Productos";
}


  useEffect(() => {
  let fetchFunction;
  let id;

  setLoading(true);

  if (subcategoryId) {
    fetchFunction = getProductsBySubcategory;
    id = subcategoryId;
  } else if (categoryId) {
    fetchFunction = getProductsByCategory;
    id = categoryId;
  } else {
    fetchFunction = getTopProducts;
  }

  fetchFunction(id)
    .then((response) => {
      setProducts(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
}, [categoryId, subcategoryId]);


  return (
    <div>
      {loading ? (
      <div className="spinner-container">
        <ClipLoader color="#007bff" size={80} />
      </div>
    ) : (
      <>
        {!categoryId && !subcategoryId && <ProductSlider />}
        <h1 className="section-title">{title}</h1>
        <ItemList products={products} />
      </>
    )}
    </div>
  );
};

export default ItemListContainer;
