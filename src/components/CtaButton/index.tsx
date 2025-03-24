import { useDispatch } from 'react-redux';
import { addFavorite } from '../../redux/reducers/favoriteProductsReducer.ts';
import styles from './CtaButton.module.css';
import { Product } from '../../types/Product.ts';

interface MainCtaButton {
  typeOfButton: string;
  title: string;
  p?: Product;
}

const buildImageUrl = (imageRef: string) => {
  // Extrai o ID da imagem e sua extensão
  const match = imageRef.match(/image-([^-]+)-(\d+x\d+)-(\w+)/);

  if (match) {
    const [, imageId, dimensions, format] = match;
    return `https://cdn.sanity.io/images/knnk47g7/production/${imageId}-${dimensions}.${format}`;
  }

  return ''; // Retorna string vazia se não conseguir parsear
};

function CtaButton({ typeOfButton, title, p }: MainCtaButton) {
  const dispatch = useDispatch();

  // Log detalhado do produto
  // console.log('Produto recebido:', JSON.stringify(p, null, 2));

  console.log(p.images?.[0]);

  const handleClick = () => {
    console.log('Botão clicado', {
      typeOfButton,
      productId: p?._id,
      productName: p?.productName,
    });

    if (typeOfButton === 'addToCart') {
      console.log('Produto adicionado ao carrinho');
    } else if (typeOfButton === 'addToFavorite') {
      if (p) {
        // Construa a URL da imagem
        const imageUrl = buildImageUrl(p.images?.[0]?.asset?._ref || '');

        dispatch(addFavorite({
          id: p._id,
          name: p.productName,
          imageUrl, // URL completa da imagem
          // price: p.price,
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
