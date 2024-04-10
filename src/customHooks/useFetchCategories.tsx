import { useEffect, useState } from 'react';
import { fetchCategories } from '../utils/fetch';
import { Category } from '../types/Category';

function useFetchCategories(): Category[] | null {
  const [categoryList, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const data: Category[] = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }

    fetchAllCategories();
  }, []);

  return categoryList;
}

export default useFetchCategories;
