import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { getTopProducts } from '../services/firebase/productService';
import '../Footer/Footer.css';

const Footer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await getTopProducts();
        setProductos(productosData);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoriasConSubcategorias = () => {
    const mapa = {};
    productos.forEach(({ category, subcategory }) => {
      if (!mapa[category]) {
        mapa[category] = new Set();
      }
      mapa[category].add(subcategory);
    });

    const resultado = {};
    for (let cat in mapa) {
      resultado[cat] = Array.from(mapa[cat]);
    }

    return resultado;
  };

  const categorias = getCategoriasConSubcategorias();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="footer-container">
      <div className="footer-content max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-6">
        {/* Categorías */}
        {Object.entries(categorias).map(([category, subcategories], index) => (
          <div key={index} className="category">
            <h5 className="footer-subheading">{category}</h5>
            <ul className="subcategory">
              {subcategories.map((sub, i) => (
                <li key={i}>
                  <Link
                    to={`/category/${category.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                    className="footer-link"
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Redes sociales */}
        <div className="socials">
          <h4 className="footer-heading">Seguinos</h4>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright mt-6 border-t pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} The Dev Store. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
