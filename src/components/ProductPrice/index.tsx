import styles from './ProductPrice.module.css';
import usePromotionalPrice from '../../customHooks/usePromotionalPrice';
import ProductPayments from '../ProductPayments';

interface ProductPriceProps {
  price: number;
  isPromotional: boolean;
  off: number;
  payments: number;
}

function ProductPrice({ price, isPromotional, off, payments }: ProductPriceProps) {
  const orginalPrice = price.toFixed(2);
  const promotionalPrice = usePromotionalPrice(price, isPromotional, off);

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

      <ProductPayments
        price={ price }
        isPromotional={ isPromotional || false }
        off={ off || 0 }
        payments={ payments || 0 }
      />
    </div>
  );
}

export default ProductPrice;
