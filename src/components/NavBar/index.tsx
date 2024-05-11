import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MobileDetect from 'mobile-detect';
import { formatUrl } from '../../utils/formatUrl';
import './nav-bar.css';

import useFetchCategories from '../../customHooks/useFetchCategories';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const categoryList = useFetchCategories();

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

      <div className={ `menu_items_container ${menuOpen ? 'open' : ''}` }>

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
