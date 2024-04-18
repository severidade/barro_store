/* eslint-disable max-len */
import styles from './ProductPayments.module.css';

interface ProductProductPayments {
  price: number;
  isPromotional: boolean;
  oofPrice: number;
  payments: number;
}

// eslint-disable-next-line max-len
function ProductPayments({ price, isPromotional, oofPrice, payments }: ProductProductPayments) {
  return (
    <div
      className={ styles.container_payments }
    >
      <p>
        ou
        {' '}
        {isPromotional && oofPrice ? (
          <>
            <span>{`${payments}X`}</span>
            {' '}
            de
            <span>{`R$ ${(oofPrice / payments).toFixed(2)}`}</span>
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
