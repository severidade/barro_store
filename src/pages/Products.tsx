import { useParams } from 'react-router-dom';
import useFetchCategories from '../customHooks/useFetchCategories';
import useFetchCategoryDetails from '../customHooks/useFetchCategoryDetails';
import useFetchProductsByCategory from '../customHooks/useFetchProductsByCategory';
import ProductLinks from '../components/ProductLinks';
import Footer from '../components/Footer';

function Products() {
  const { category } = useParams();

  const categoryList = useFetchCategories();
  const categoryDetails = useFetchCategoryDetails(categoryList, category);
  const productsByCategory = useFetchProductsByCategory(categoryDetails);

  return (
    <div className="main">
      {/* <h1>
        Esta é a página de produtos da categoria
        {' '}
        {category}
      </h1>
      <h1>Produtos por Categoria</h1> */}

      {category && (
        <ProductLinks
          category={ category }
          products={ productsByCategory || [] }
        />
      )}
      <Footer />
    </div>
  );
}

export default Products;
