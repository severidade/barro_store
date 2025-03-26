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
            <ul>
              {favoriteProducts.map((product) => (
                <li key={ product.id }>
                  <img src={ product.imageUrl } alt={ product.name } width="100" />
                  <p>{product.name}</p>
                  <Link
                    to={ product.productUrl }
                    className="see_product"
                  >
                    Ver Produto
                  </Link>
                  <button
                    onClick={ () => dispatch(removeFavorite(product.id)) }
                    type="button"
                    className="remove_product"
                  >
                    Remover produto
                  </button>

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
