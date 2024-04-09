import { useParams } from 'react-router-dom';

import useFetchCategories from '../customHooks/useFetchCategories';
import useFetchCategoryDetails from '../customHooks/useFetchCategoryDetails';
import useFetchProductsByCategory from '../customHooks/useFetchProductsByCategory';

import ProductLinks from '../components/ProductLinks';

function Products() {
  const { category } = useParams(); // retorna a categoria vindo da url

  const categoryList = useFetchCategories();// 01
  const categoryDetails = useFetchCategoryDetails(categoryList, category);// 02
  const productsByCategory = useFetchProductsByCategory(categoryDetails);
  // 01 Faz o fetch na api retornando todas as categorias
  // 02 Filtra a lista de categorias e retorna os detalhes da categoria vinda da url.

  // const [productsByCategory, setProductsByCategory] = useState<Product[] | null>(null);
  // 03 productsByCategory: Armazena os produtos da categoria selecionada.

  return (
    <div className="main">
      <h1>
        Esta é a página de produtos da categoria
        {' '}
        {category}
      </h1>
      <h1>Produtos por Categoria</h1>

      {category && (
        <ProductLinks
          category={ category }
          products={ productsByCategory || [] }
        />
      )}

    </div>
  );
}

export default Products;
