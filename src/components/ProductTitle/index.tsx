import styles from './ProductTitle.module.css';

interface ProductTitleProps {
  productName: string;
}

function ProductTitle({ productName }: ProductTitleProps) {
  return (
    <h1 className={ styles.product_title }>
      <h2>{ productName }</h2>
    </h1>
  );
}

export default ProductTitle;
