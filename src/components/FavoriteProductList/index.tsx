/* eslint-disable max-len */
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './FavoriteProductList.module.css';
import FavoriteProductCard from '../FavoriteProductCard';

function FavoriteProductList() {
  const favoriteProducts = useSelector((state: RootState) => {
    console.log('Redux State:', state);
    console.log('Favorite Products State:', state.favoriteProducts);
    return state.favoriteProducts;
  });

  return favoriteProducts.length > 0 ? (
    <ul className={ styles.favorite_products_list }>
      {favoriteProducts.map((product) => (
        <FavoriteProductCard product={ product } key={ product.id } />
      ))}
    </ul>
  ) : (
    <p>Você ainda não adicionou produtos à sua lista de favoritos.</p>
  );
}

export default FavoriteProductList;
