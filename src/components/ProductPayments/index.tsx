/* eslint-disable max-len */
import styles from './ProductPayments.module.css';
import usePromotionalPrice from '../../customHooks/usePromotionalPrice';

interface ProductProductPayments {
  price: number;
  isPromotional: boolean;
  off: number;
  payments: number;
}

// eslint-disable-next-line max-len
function ProductPayments({ price, isPromotional, off, payments }: ProductProductPayments) {
  const promotionalPrice = usePromotionalPrice(price, isPromotional, off);

  return (
    <div
      className={ styles.container_payments }
    >
      <p>
        ou
        {' '}
        {isPromotional && promotionalPrice ? (
          <>
            <span>{`${payments}X`}</span>
            {' '}
            de
            <span>{`R$ ${(promotionalPrice / payments).toFixed(2)}`}</span>
            {' '}
            sem juros
          </>
        ) : (
          <>
            <span>{`${payments}X`}</span>
            {' '}
            de
            <span>{`R$ ${(price / payments).toFixed(2)}`}</span>
            {' '}
            sem juros
          </>
        )}
      </p>
    </div>
  );
}

export default ProductPayments;
