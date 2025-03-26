/* eslint-disable max-len */
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorite } from '../redux/reducers/favoriteProductsReducer.ts';
import { RootState } from '../redux/store';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import MainTitle from '../components/MainTitle/index.tsx';

function FavoriteProducts() {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state: RootState) => {
    // console.log('Redux State:', state);
    // console.log('Favorite Products State:', state.favoriteProducts);
    return state.favoriteProducts;
  });

  return (
    <>
      <NavBar />
      <div className="main">
        <div className="container_page single">
          <MainTitle title="Produtos Favoritos" />
          {/* <p>
            Número de produtos favoritos:
            {favoriteProducts.length}
          </p> */}
          {favoriteProducts.length > 0 ? (
            <ul className="favorite-products-list">
              {favoriteProducts.map((product) => (
                <li className="favorite-product-card" key={ product.id }>
                  <img className="favorite-product-image" src={ product.imageUrl } alt={ product.name } />
                  <p className="favorite-product-name">{product.name}</p>
                  <div className="favorite-product-actions">
                    <Link to={ product.productUrl } className="see_product"> Ver Produto </Link>
                    <button
                      onClick={ () => dispatch(removeFavorite(product.id)) }
                      type="button"
                      className="remove_product"
                    >
                      Remover produto
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Você ainda não adicionou produtos à sua lista de favoritos.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FavoriteProducts;
