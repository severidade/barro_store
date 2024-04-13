import styles from './ProductTitle.module.css';

interface ProductTitleProps {
  productName: string;
}

function ProductTitle({ productName }: ProductTitleProps) {
  return (
    <div className={ styles.product_title }>
      <h2>{ productName }</h2>
    </div>
  );
}

export default ProductTitle;
