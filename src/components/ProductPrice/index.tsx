import { useState, useEffect } from 'react';
import styles from './ProductPrice.module.css';

interface ProductPriceProps {
  price: number;
  isPromotional: boolean;
  off: number;
}

function ProductPrice({ price, isPromotional, off }: ProductPriceProps) {
  const orginalPrice = price.toFixed(2);

  const [promotionalPrice, setPromotionalPrice] = useState<number | null>(null);

  useEffect(() => {
    if (isPromotional && off && !promotionalPrice) {
      const discountedPrice = price - (price * off) / 100;
      setPromotionalPrice(discountedPrice);
    }
  }, [isPromotional, off, price, promotionalPrice]);

  console.log(promotionalPrice);

  return (
    <div
      className={ styles.container_product_price }
    >
      <p>
        <span className={ styles.currency_symbol }>R$ </span>
        {isPromotional && promotionalPrice ? (
          <>
            <span className={ styles.price }>
              {promotionalPrice.toFixed(2)}
            </span>
            <span className={ ` ${off && styles.oldPrice} ` }>
              {' '}
              {orginalPrice}
            </span>
          </>
        ) : (
          <span className={ styles.price }>
            { orginalPrice }
          </span>
        )}
      </p>
    </div>
  );
}

export default ProductPrice;
