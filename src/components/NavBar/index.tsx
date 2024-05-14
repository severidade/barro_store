/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { isMobileDevice } from '../../utils/isMobileDevice';
import { formatUrl } from '../../utils/formatUrl';
import './nav-bar.css';

import useFetchCategories from '../../customHooks/useFetchCategories';

function NavBar() {
  const categoryList = useFetchCategories();
  const MAX_WIDTH_MOBILE = 1024;

  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  //  impede o scroll quando o menu estiver aberto (somente em dispositivo mobile).
  useEffect(() => {
    if (isMobileDevice()) {
      document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    }
  }, [menuOpen]);

  // controla o menu
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      const menuContainer = document.getElementById('menu_items_container');

      // Sempre que a largura da tela for redimensionada, adicione ou remova a classe 'mobile' do menuContainer
      menuContainer?.classList.toggle('mobile', newWidth <= MAX_WIDTH_MOBILE);

      // Se a largura da tela for maior que 1024 pixels e o menu estiver aberto, feche-o
      if (newWidth > MAX_WIDTH_MOBILE && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Execute o manipulador de redimensionamento inicialmente
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

      <div
        // Adiciona ou remove a classe 'mobile' com base na largura da tela
        id="menu_items_container"
        className={ `menu_items_container ${windowWidth <= 1024 ? 'mobile' : ''} ${menuOpen ? 'open' : ''}` }
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

      <NavLink className="level_one_menu_item" to="/*">Carrinho</NavLink>
    </nav>
  );
}

export default NavBar;

// gesto de deslizar só funciona em dispositivo mobile - feito
// em mobile quado o menu estiver aberto nao pode ter scrcoll - feito
// deslizar para a esquerda fecha menu e para a direita abre - nao vai ser implementado

// toggleMenu inicia oculto porque menu open inicial false
// 01 Desabilitar o elemento que dispara abertura e fechamento do hamburger
