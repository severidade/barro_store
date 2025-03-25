/* eslint-disable no-underscore-dangle */
import { useDispatch } from 'react-redux';
import { addFavorite } from '../../redux/reducers/favoriteProductsReducer.ts';
import { AppDispatch } from '../../redux/store';
import styles from './CtaButton.module.css';
import { Product } from '../../types/Product.ts';

interface MainCtaButton {
  typeOfButton: string;
  title: string;
  selectedProduct: Product;
}

const buildImageUrl = (imageRef: string) => {
  const parts = imageRef.split('-');

  if (parts.length === 4) {
    const imageId = parts[1];
    const dimensions = parts[2];
    const format = parts[3];
    return `https://cdn.sanity.io/images/knnk47g7/production/${imageId}-${dimensions}.${format}`;
  }
  return '';
};

function CtaButton({ typeOfButton, title, selectedProduct }: MainCtaButton) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    console.log('Botão clicado', {
      typeOfButton,
      productId: selectedProduct?._id,
      productName: selectedProduct?.productName,
    });

    if (typeOfButton === 'addToCart') {
      console.log('Produto adicionado ao carrinho');
    } else if (typeOfButton === 'addToFavorite') {
      if (selectedProduct) {
        // Constrói a URL da imagem pegando a primeira imagem do produto
        const imageUrl = buildImageUrl(selectedProduct.images?.[0]?.asset?._ref || '');

        dispatch(addFavorite({
          id: selectedProduct._id,
          name: selectedProduct.productName,
          imageUrl,
          // price: selectedProduct.price,
        }));
      } else {
        console.warn('Produto não definido ao tentar adicionar aos favoritos');
      }
    }
  };

  return (
    <button onClick={ handleClick } className={ styles[typeOfButton] }>
      <span>{title}</span>
    </button>
  );
}

export default CtaButton;
