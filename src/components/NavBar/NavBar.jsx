import { Menu } from 'antd';
import CartWidget from '../CartWidget/CartWidget';
import '../../styles.css';
import logo from '../../assets/images/devstorelogo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuMode, setMenuMode] = useState('horizontal');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const updateMenuMode = () => {
      setMenuMode(window.innerWidth <= 768 ? 'inline' : 'horizontal');
    };

    updateMenuMode();
    window.addEventListener('resize', updateMenuMode);
    return () => window.removeEventListener('resize', updateMenuMode);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };

    const handleClickOutside = (event) => {
      const menu = document.querySelector('.menu-container');
      const hamburger = document.querySelector('.hamburger-btn');
      if (
        isMenuOpen &&
        menu &&
        !menu.contains(event.target) &&
        hamburger &&
        !hamburger.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const menuItems = useMemo(() => [
    {
      label: <Link to="/category/hardware" onClick={handleLinkClick}>Hardware</Link>,
      key: 'hardware',
      children: [
        { key: 'hardware-1', label: <Link to="/subcategory/pcescritorio" onClick={handleLinkClick}>Computadoras de Escritorio</Link> },
        { key: 'hardware-2', label: <Link to="/subcategory/notebooks" onClick={handleLinkClick}>Notebooks</Link> },
        { key: 'hardware-3', label: <Link to="/subcategory/monitores" onClick={handleLinkClick}>Monitores</Link> },
        { key: 'hardware-4', label: <Link to="/subcategory/gabinetes" onClick={handleLinkClick}>Gabinetes para PC</Link> },
        { key: 'hardware-5', label: <Link to="/subcategory/mouses" onClick={handleLinkClick}>Mouses</Link> },
        { key: 'hardware-6', label: <Link to="/subcategory/teclados" onClick={handleLinkClick}>Teclados</Link> },
        { key: 'hardware-7', label: <Link to="/subcategory/auriculares" onClick={handleLinkClick}>Auriculares</Link> },
      ],
    },
    {
      label: <Link to="/category/accesorios" onClick={handleLinkClick}>Accesorios de Oficina</Link>,
      key: 'accesorios',
      children: [
        { key: 'accesorios-1', label: <Link to="/subcategory/escritorios" onClick={handleLinkClick}>Escritorios Ergonómicos</Link> },
        { key: 'accesorios-2', label: <Link to="/subcategory/sillas" onClick={handleLinkClick}>Sillas Ergonómicas</Link> },
      ],
    },
    {
      label: <Link to="/category/decoracion" onClick={handleLinkClick}>Personalización y Decoración</Link>,
      key: 'decoracion',
      children: [
        { key: 'decoracion-1', label: <Link to="/subcategory/luces" onClick={handleLinkClick}>Luces LED</Link> },
        { key: 'decoracion-2', label: <Link to="/subcategory/cuadros" onClick={handleLinkClick}>Cuadros Temáticos</Link> },
        { key: 'decoracion-3', label: <Link to="/subcategory/accesorios" onClick={handleLinkClick}>Accesorios Decorativos para Setups</Link> },
      ],
    },
  ], []);

  return (
    <div className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <Link to="/" className="brand" onClick={handleLinkClick}>
        <span className="brand-name">The Dev Store</span>
        <img src={logo} alt="Logo" />
      </Link>

      <button className="hamburger-btn" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
        <Menu
          mode={menuMode}
          className="custom-menu"
          items={menuItems}
          overflowedIndicator={null}
        />
      </div>

      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
        <CartWidget />
      </div>
    </div>
  );
};

export default NavBar;
