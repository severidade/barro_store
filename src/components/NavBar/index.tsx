import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../utils/fetch';
import { Category } from '../../types/Category';
import { formatUrl } from '../../utils/formatUrl';
import './nav-bar.css';

function NavBar() {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        // Lida com o erro na busca dos posts para o carrossel
      }
    }

    fetchAllCategories();
  }, []);

  return (
    <nav className="container_menu">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/historia">História</NavLink>
      {/* <NavLink to="/produtos">Produtos</NavLink> */}
      <div className="menu_second_level">
        {
          categories && categories.map((category) => (
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
