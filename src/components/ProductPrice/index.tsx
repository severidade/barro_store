import styles from './ProductPrice.module.css';

interface ProductPriceProps {
  productPrice: number;
  isPromotional: boolean;
  discount: number;
}

function ProductPrice({ productPrice, isPromotional, discount }: ProductPriceProps) {
  const formattedPrice = productPrice.toFixed(2);
  const discountProduct = discount;

  // console.log(discountProduct);

  return (
    <div
      className={ styles.product_price }
    >
      <p>
        <span className={ styles.currency_symbol }>R$ </span>
        <span className={ `${isPromotional ? styles.promotional_price : ''}` }>
          {formattedPrice}
        </span>
      </p>
    </div>
  );
}

export default ProductPrice;
