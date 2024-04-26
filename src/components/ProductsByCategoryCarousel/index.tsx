// import useFetchProductsByCategory from '../../customHooks/useFetchProductsByCategory';

// import useFetchCategories from '../../customHooks/useFetchCategories';
// import useFetchCategoryDetails from '../../customHooks/useFetchCategoryDetails';
import useFetchProductsByCategory from '../../customHooks/useFetchProductsByCategory';
import ProductLinks from '../ProductLinks';

interface FetchProductsByCategoryProps {
  categoryId: string | undefined;
  categoryOfProduct: string ;
}

// eslint-disable-next-line max-len
function ProductsByCategoryCarousel({ categoryId, categoryOfProduct } : FetchProductsByCategoryProps) {
  const productsByCategory = useFetchProductsByCategory(categoryId || '');

  return (
    <>
      <h1>
        Veja mais produtos nesta categoria
      </h1>
      <ProductLinks
        category={ categoryOfProduct }
        products={ productsByCategory || [] }
      />
    </>
  );
}

export default ProductsByCategoryCarousel;
