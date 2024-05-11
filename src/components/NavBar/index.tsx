import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MobileDetect from 'mobile-detect';
import { formatUrl } from '../../utils/formatUrl';
import './nav-bar.css';

import useFetchCategories from '../../customHooks/useFetchCategories';

function NavBar() {
  const categoryList = useFetchCategories();

  const [menuOpen, setMenuOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const isMobileDevice = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    return md.mobile() !== null;
  };

  console.log('Este é um dispositivo mobile?', isMobileDevice());

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleMenu();
    }
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (menuOpen) {
      const touchCurrentX = event.touches[0].clientX;
      const touchDiffX = touchStartX - touchCurrentX;

      // Se o usuário deslizar a tag nav para a esquerda em pelo menos 50 pixels, feche o menu
      if (touchDiffX > 20) {
        setMenuOpen(false);
      }
    }
  };

  return (
    <nav className="container_menu">

      <div
        className="hamburger"
        onClick={ toggleMenu }
        onKeyDown={ handleMenuKeyDown }
        tabIndex={ 0 }
        role="button"
        aria-label="Toggle menu"
      >
        <div className=" dot" />
      </div>

      <NavLink
        to="/"
        className="logo"
        // onClick={ scrollToTop }
      >
        Barro
      </NavLink>

      <NavLink className="level_one_menu_item" to="/*">Carrinho</NavLink>

      <div
        className={ `menu_items_container ${menuOpen ? 'open' : ''}` }
        onTouchStart={ handleTouchStart }
        onTouchMove={ handleTouchMove }
      >

        <NavLink
          className="level_one_menu_item"
          to="/historia"
          onClick={ toggleMenu }
        >
          História
        </NavLink>

        <div className="level_two_menu_container">
          {
          categoryList && categoryList.map((category) => (
            <NavLink
              className="level_two_menu_item"
              to={ `/produtos/${formatUrl(category.title)}` }
              key={ category._id }
              onClick={ toggleMenu }
            >
              {category.title}
            </NavLink>
          ))
        }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

// menu aberto nao pode ter scrcoll
