/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useParams, Link, useNavigate } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../cliente.js';

import useFetchCategories from '../customHooks/useFetchCategories';
import useFetchCategoryDetails from '../customHooks/useFetchCategoryDetails';
import useFetchProductsByCategory from '../customHooks/useFetchProductsByCategory';

import { formatUrl } from '../utils/formatUrl'; // acho que vou remover

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

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
      <div className="container_products">
        {productsByCategory && productsByCategory.map((product) => (
          <Link
            to={ `/produtos/${category}/${formatUrl(product.productName)}?productId=${product._id}` }
            key={ product._id }
            className="card_product"
          >
            {product.images.length > 0 && (
              <figure className="product_image">
                <img
                  src={ urlFor(product.images[0]).url() }
                  alt={ product.productName }
                />
              </figure>
            )}
            <h3 className="product_link">{product.productName}</h3>

          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
