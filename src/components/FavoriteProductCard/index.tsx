/* eslint-disable max-len */
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks.ts';
import styles from './FavoriteProductCard.module.css';
import { removeFavorite } from '../../redux/reducers/favoriteProductsReducer.ts';

interface FavoriteProductCardProps {
  product: {
    id: string;
    imageUrl: string;
    name: string;
    productUrl: string;
  };
}

function FavoriteProductCard({ product }: FavoriteProductCardProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFavorite(product.id));
  };

  return (
    <li className={ styles.favorite_product_card }>
      <img className={ styles.favorite_product_image } src={ product.imageUrl } alt={ product.name } />
      <p className={ styles.favorite_product_name }>{product.name}</p>
      <div className={ styles.favorite_product_actions }>
        <Link to={ product.productUrl } className={ styles.see_product }> Ver Produto </Link>
        <button
          onClick={ handleRemove }
          type="button"
          className={ styles.remove_product }
        >
          Remover produto
        </button>
      </div>
    </li>
  );
}

export default FavoriteProductCard;
