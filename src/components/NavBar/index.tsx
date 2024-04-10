import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatUrl } from '../../utils/formatUrl';
import './nav-bar.css';

import useFetchCategories from '../../customHooks/useFetchCategories';
import { Page } from '../../types/Page';
import { fetchPages } from '../../utils/fetch';

function NavBar() {
  const categoryList = useFetchCategories();

  const [pages, setPages] = useState<Page[] | null>(null);

  useEffect(() => {
    async function fetchPagesData() {
      try {
        const pagesData = await fetchPages();
        setPages(pagesData);
      } catch (error) {
        console.error('Erro ao buscar as páginas:', error);
      }
    }

    fetchPagesData();
  }, []);

  console.log(pages);

  return (
    <nav className="container_menu">
      {/* <NavLink to="/">Home</NavLink>
      <NavLink to="/historia">História</NavLink> */}
      {/* <NavLink to="/produtos">Produtos</NavLink> */}
      <div className="menu_pages">
        { pages && pages.map((page) => (
          <NavLink to={ `/${page.pageSlug.current}` } key={ page._id }>
            {page.pageTitle}
          </NavLink>
        ))}
      </div>
      <div className="menu_second_level">
        {
          categoryList && categoryList.map((category) => (
            <NavLink to={ `/produtos/${formatUrl(category.title)}` } key={ category._id }>
              {category.title}
            </NavLink>
          ))
        }
      </div>
    </nav>
  );
}

export default NavBar;
