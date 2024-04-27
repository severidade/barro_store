/* eslint-disable max-len */
// import useFetchProductsByCategory from '../../customHooks/useFetchProductsByCategory';

// import useFetchCategories from '../../customHooks/useFetchCategories';
// import useFetchCategoryDetails from '../../customHooks/useFetchCategoryDetails';
import { useEffect, useState } from 'react';
import useFetchProductsByCategory from '../../customHooks/useFetchProductsByCategory';
import ProductLinks from '../ProductLinks';
import { Product } from '../../types/Product';

interface FetchProductsByCategoryProps {
  categoryId: string | undefined;
  categoryOfProduct: string ;
  productId: string | undefined;
}

function ProductsByCategoryCarousel({ categoryId, categoryOfProduct, productId } : FetchProductsByCategoryProps) {
  const productsByCategory = useFetchProductsByCategory(categoryId || '');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productsByCategory && productId) {
      // eslint-disable-next-line no-underscore-dangle
      const updatedProducts = productsByCategory.filter((product) => product._id !== productId);
      setFilteredProducts(updatedProducts);
    }
  }, [productsByCategory, productId]);

  return (
    <>
      <h1>
        Veja mais produtos nesta categoria
      </h1>
      <ProductLinks
        category={ categoryOfProduct }
        products={ filteredProducts || [] }
      />
    </>
  );
}

export default ProductsByCategoryCarousel;
