import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../utils/fetch';
import { Product } from '../types/Product';
import { Category } from '../types/Category';

// eslint-disable-next-line max-len
function useFetchProductsByCategory(categoryDetails: Category | null) {
  const [productsByCategory, setProductsByCategory] = useState<Product[] | null>(null);

  useEffect(() => {
    async function fetchAllProductsByCategory() {
      try {
        if (categoryDetails) {
          // eslint-disable-next-line no-underscore-dangle
          const data = await fetchProductsByCategory(categoryDetails._id);
          setProductsByCategory(data);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
      }
    }

    fetchAllProductsByCategory();
  }, [categoryDetails]);

  return productsByCategory;
}

export default useFetchProductsByCategory;
