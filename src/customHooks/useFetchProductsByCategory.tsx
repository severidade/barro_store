import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../utils/fetch';
import { Product } from '../types/Product';
// import { Category } from '../types/Category';

// eslint-disable-next-line max-len
function useFetchProductsByCategory(categoryId: string | null) {
  const [productsByCategory, setProductsByCategory] = useState<Product[] | null>(null);

  useEffect(() => {
    async function fetchAllProductsByCategory() {
      try {
        if (categoryId) {
          // eslint-disable-next-line no-underscore-dangle
          const data = await fetchProductsByCategory(categoryId);
          setProductsByCategory(data);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
      }
    }

    fetchAllProductsByCategory();
  }, [categoryId]);

  return productsByCategory;
}

export default useFetchProductsByCategory;

// com o id da categoria eu busco todos os produtos da categoria
