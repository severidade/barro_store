/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../cliente.js';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { fetchCategories, fetchProductsByCategory } from '../utils/fetch';

import { formatUrl } from '../utils/formatUrl';

import useFetchCategories from '../customHooks/useFetchCategories';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

function Products() {
  const { category } = useParams();
  const navigate = useNavigate();
  // essa informação esta vindo da url

  const categoryList = useFetchCategories(); // estou fazendo o fetch na api retornando todas as categorias

  const [categoryDetails, setCategoryDetails] = useState<Category | null>(null); // o estado acima recupera todas as informações da categoria
  // 01 categoryList: Armazena a lista de todas as categorias.
  // 02 categoryDetails: Armazena os detalhes da categoria selecionada.

  const [productsByCategory, setProductsByCategory] = useState<Product[] | null>(null);
  // 03 productsByCategory: Armazena os produtos da categoria selecionada.

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

  useEffect(() => {
    async function fetchAllProductsByCategory() {
      try {
        if (categoryDetails) {
          const data = await fetchProductsByCategory(categoryDetails._id);
          setProductsByCategory(data);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
      }
    }

    fetchAllProductsByCategory();
  }, [categoryDetails]);

  // console.log(productsByCategory);

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
            <h3 className="product_link">{product.productName}</h3>

          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
