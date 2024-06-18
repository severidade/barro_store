/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { isMobileDevice } from '../../utils/isMobileDevice';
import { formatUrl } from '../../utils/formatUrl';
import './nav-bar.css';
import './animacao_hamburger.css';

import useFetchCategories from '../../customHooks/useFetchCategories';
import scrollToTop from '../../utils/scrollToTop';

interface NavBarProps {
  page: string;
}

function NavBar({ page } :NavBarProps) {
  const categoryList = useFetchCategories();

  const MAX_WIDTH_MOBILE = 1024;

  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isFixed, setIsFixed] = useState(false);

  const toggleMenu = useCallback((shouldScrollToTop = false, closeIfOpen = false) => {
    setMenuOpen((prevMenuOpen) => (closeIfOpen ? false : !prevMenuOpen));
    if (shouldScrollToTop) {
      scrollToTop();
    }
  }, []);

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

  // Lógica específica para a página home
  useEffect(() => {
    if (page === 'home') {
      const handleScroll = () => {
        const alturaTela = window.innerHeight;
        const disparo = alturaTela * (1 / 9);
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > disparo) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Limpa evento de scroll
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [page]);

  return (
    <nav
      className={ `container_menu ${windowWidth <= 1024 && page === 'home' ? 'menu_on_home' : ''} ${isFixed ? 'fixed' : ''}` }
    >
      <button
        className={ `mascara ${windowWidth <= 1024 ? 'mobile' : ''} ${menuOpen ? 'open' : ''}` }
        onTouchStart={ handleTouchStart }
        onTouchMove={ handleTouchMove }
        // onClick={ toggleMenuMobile }
        onClick={ () => toggleMenu(false) }
      >
        Fechar Menu
      </button>

      <div
        className={ `hamburger ${menuOpen ? 'open' : ''}` }
        // onClick={ toggleMenuMobile }
        onClick={ () => toggleMenu(false) }
        onKeyDown={ handleMenuKeyDown }
        tabIndex={ 0 }
        role="button"
        aria-label="Toggle menu"
      >
        <div className="hamburger_animacao" />
      </div>

      <NavLink
        to="/"
        className="logo"
        // onClick={ toggleMenuHome }
        // onClick={ scrollToTop }
        onClick={ () => toggleMenu(true, true) }
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
          // onClick={ toggleMenu }
          onClick={ () => toggleMenu(true) }
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
              // onClick={ toggleMenu }
              onClick={ () => toggleMenu(true) }
            >
              {category.title}
            </NavLink>
          ))
        }
        </div>
      </div>

      <NavLink className="level_one_menu_item favorites_list" to="/favoritos">Favoritos</NavLink>
      <NavLink className="level_one_menu_item shopping_cart" to="/shopping">Carrinho</NavLink>

    </nav>
  );
}

export default NavBar;
