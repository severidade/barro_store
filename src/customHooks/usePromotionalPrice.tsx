import { useState, useEffect } from 'react';

// eslint-disable-next-line max-len
function usePromotionalPrice(price: number, isPromotional: boolean, off: number): number | null {
  const [promotionalPrice, setPromotionalPrice] = useState<number | null>(null);

  useEffect(() => {
    if (isPromotional && off && !promotionalPrice) {
      const discountedPrice = price - (price * off) / 100;
      setPromotionalPrice(discountedPrice);
    }
  }, [isPromotional, off, price, promotionalPrice]);

  return promotionalPrice;
}

export default usePromotionalPrice;
