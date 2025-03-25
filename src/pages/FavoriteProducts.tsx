import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorite } from '../redux/reducers/favoriteProductsReducer.ts';
import { RootState } from '../redux/store';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

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
        <h1>Página de Produtos Favoritos</h1>
        <p>
          Número de produtos favoritos:
          {favoriteProducts.length}
        </p>
        {favoriteProducts.length > 0 ? (
          <ul>
            {favoriteProducts.map((product) => (
              <li key={ product.id }>
                <img src={ product.imageUrl } alt={ product.name } width="100" />
                <p>{product.name}</p>
                <Link to={ product.productUrl }>Ver Produto</Link>
                <button
                  onClick={ () => dispatch(removeFavorite(product.id)) }
                  type="button"
                >
                  Remover produto
                </button>

              </li>
            ))}
          </ul>
        ) : (
          <p>Você ainda não tem produtos favoritos.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default FavoriteProducts;
