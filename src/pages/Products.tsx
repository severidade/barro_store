import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../cliente.js';
import { Category } from '../types/Category';
import { fetchCategories, fetchProductsByCategory } from '../utils/fetch';

import { formatUrl } from '../utils/formatUrl';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

function Products() {
  const { category } = useParams(); // essa informação esta vindo da url
  const [categoryList, setCategories] = useState<Category[] | null>(null); // estou fazendo o fetch na api retornando todas as categorias
  const [categoryDetails, setCategoryDetails] = useState<Category | null>(null); // o estado acima recupera todas as informações da categoria

  // const categoryId = categoryDetails._id;
  const [productsByCategory, setProductsByCategory] = useState<Product[] | null>(null);

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        // Lida com o erro na busca dos posts para o carrossel
      }
    }

    fetchAllCategories();
  }, []);

  // Pego a lista de todas as categorias e comparo com a url vinda do useParams
  // A primeira ocorrência retorno todas as informações da categoria
  // Abaixo em fetchAllProductsByCategory passo somente o id da Categoria
  useEffect(() => {
    if (categoryList && category) {
      const foundCategory = categoryList.find((cat) => formatUrl(cat.title) === category);
      setCategoryDetails(foundCategory || null);
    }
  }, [categoryList, category]);

  useEffect(() => {
    async function fetchAllProductsByCategory() {
      try {
        const data = await fetchProductsByCategory(categoryDetails._id);
        setProductsByCategory(data);
      } catch (error) {
        // Lida com o erro na busca dos posts para o carrossel
      }
    }

    fetchAllProductsByCategory();
  }, [categoryDetails]);

  console.log(productsByCategory);

  return (
    <>
      <h1>
        Esta é a página de produtos da categoria
        {' '}
        {category}
      </h1>

      <h1>Produtos por Categoria</h1>
      <div className="container_products">
        {productsByCategory && productsByCategory.map((product) => (
          <Link
            // to={ `/produtos/${category}/${formatUrl(product.productName)}` }
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
            <h3>{product.productName}</h3>

          </Link>
        ))}
      </div>
    </>
  );
}

export default Products;
