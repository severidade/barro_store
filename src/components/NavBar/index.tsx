import { NavLink } from 'react-router-dom';
import { formatUrl } from '../../utils/formatUrl';
import './nav-bar.css';

import useFetchCategories from '../../customHooks/useFetchCategories';

function NavBar() {
  const categoryList = useFetchCategories();

  return (
    <nav className="container_menu">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/historia">História</NavLink>
      {/* <NavLink to="/produtos">Produtos</NavLink> */}
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
