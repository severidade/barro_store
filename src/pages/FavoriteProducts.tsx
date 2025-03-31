/* eslint-disable max-len */
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import MainTitle from '../components/MainTitle/index.tsx';
import FavoriteProductCard from '../components/FavoriteProductCard/index.tsx';

function FavoriteProducts() {
  const favoriteProducts = useSelector((state: RootState) => {
    console.log('Redux State:', state);
    console.log('Favorite Products State:', state.favoriteProducts);
    return state.favoriteProducts;
  });

  return (
    <>
      <NavBar />
      <div className="main">
        <div className="container_page single">
          <MainTitle title="Produtos Favoritos" />
          {favoriteProducts.length > 0 ? (
            <ul className="favorite-products-list">
              {favoriteProducts.map((product) => (
                <FavoriteProductCard
                  product={ product }
                  key={ product.id }
                />
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
