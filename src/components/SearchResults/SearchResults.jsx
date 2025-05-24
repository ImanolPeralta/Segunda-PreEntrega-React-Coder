import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopProducts } from "../services/firebase/productService";
import Item from "../Item/Item";
import "../../styles.css";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getTopProducts();


        const filtered = allProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error al buscar productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Cargando...</h2>;

  return (
    <div className="search-results-container">
      <h2 className="section-title">Resultados para: "{query}"</h2>
      {results.length === 0 ? (
        <p style={{ textAlign: "center" }}>No se encontraron productos.</p>
      ) : (
        <div className="product-grid">
          {results.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
