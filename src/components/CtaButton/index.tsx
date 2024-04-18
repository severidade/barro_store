import styles from './CtaButton.module.css';

interface MainCtaButton {
  typeOfButton: string;
  title: string
}

const handleAddToCart = () => {
  console.log('Produto adicionado ao carrinho:');
};

const handleAddToFavorite = () => {
  console.log('Produto adicionado aos favoritos:');
};

function CtaButton({ typeOfButton, title }: MainCtaButton) {
  // eslint-disable-next-line max-len
  const buttonStyle = typeOfButton === 'addToCart' ? styles.addToCart : styles.addToFavorite;
  const handleClick = () => {
    if (typeOfButton === 'addToCart') {
      handleAddToCart(); // Chama a função para adicionar ao carrinho
    } else if (typeOfButton === 'addToFavorite') {
      handleAddToFavorite(); // Chama a função para adicionar aos favoritos
    }
  };
  return (
    <button onClick={ handleClick } className={ buttonStyle }>
      <span>
        {title}
      </span>
    </button>
  );
}

export default CtaButton;
