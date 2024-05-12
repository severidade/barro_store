import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import MobileDetect from 'mobile-detect';
import { formatUrl } from '../../utils/formatUrl';
import './nav-bar.css';

import useFetchCategories from '../../customHooks/useFetchCategories';

function NavBar() {
  const categoryList = useFetchCategories();

  const [menuOpen, setMenuOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  // Se for um dispositivo mobile o menu pode ser fechado com um slider para esquerda
  const handleTouchStart = (event: any) => {
    if (isMobileDevice()) {
      setTouchStartX(event.touches[0].clientX);
    }
  };

  const handleTouchMove = (event: any) => {
    if (isMobileDevice() && menuOpen && touchStartX !== null) {
      const touchCurrentX = event.touches[0].clientX;
      const touchDiffX = touchStartX - touchCurrentX;

      // Quando a div menu_items_container esta aberto e é deslocado para esquerda o gesto fecha o menu.
      if (touchDiffX > 50) {
        setMenuOpen(false);
      }
    }
  };

  //  Impedir o scroll quando o menu estiver aberto (somente em dispositivo mobile).
  useEffect(() => {
    if (isMobileDevice()) {
      document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    }
  }, [menuOpen]);

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
        onTouchStart={ isMobileDevice() ? handleTouchStart : undefined }
        onTouchMove={ isMobileDevice() ? handleTouchMove : undefined }
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

// gesto de deslizar só funciona em dispositivo mobile - feito
// em mobile quado o menu estiver aberto nao pode ter scrcoll - feito
// deslizar para a esquerda fecha menu e para a direita abre - nao vai ser implementado
