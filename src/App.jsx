import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { HashRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import SearchResults from './components/SearchResults/SearchResults';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/subcategory/:subcategoryId" element={<ItemListContainer />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category/:categoryId/:subcategoryId" element={<ItemListContainer />} />

            {/* ✅ Ruta para los resultados de búsqueda */}
            <Route path="/search/:query" element={<SearchResults />} />

            <Route path="*" element={<h1>404 NOT FOUND</h1>} />
          </Routes>
          <Footer />
        </CartProvider>
      </HashRouter>
    </div>
  );
};

export default App;
