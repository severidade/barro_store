import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types/Category';

import { formatUrl } from '../utils/formatUrl';

// eslint-disable-next-line max-len
function useFetchCategoryDetails(categoryList: Category[] | null, category: string | undefined) {
  const navigate = useNavigate();
  const [categoryDetails, setCategoryDetails] = useState<Category | null>(null);

  useEffect(() => {
    if (categoryList && category) {
      const foundCategory = categoryList.find((cat) => formatUrl(cat.title) === category);
      if (foundCategory) {
        setCategoryDetails(foundCategory);
      } else {
        // Redirecionar para a rota de erro
        navigate('/error');
      }
    }
  }, [categoryList, category, navigate]);

  return categoryDetails;
}

export default useFetchCategoryDetails;
