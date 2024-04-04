import { useParams } from 'react-router-dom';
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
  const [categoryList, setCategories] = useState<Category[] | null>(null); // estou fazendo o fatch na api e retornando todas as categorias
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

  return (
    <>
      <h1>
        Esta é a página de produtos da categoria
        {' '}
        {category}
      </h1>

      {/* <p>{ categoryDetails && categoryDetails._id}</p> */}
      <h1>Produtos por Categoria</h1>
      <div className="container_products">
        {productsByCategory && productsByCategory.map((product) => (
          <div
            key={ product._id }
            className="card_product"
          >
            {product.images.length > 0 && (
              <figure className="product_image">
                <img
                  src={ urlFor(product.images[0]).url() }
                  alt="Imagem 1"
                />
              </figure>
            )}
            <h3>{product.productName}</h3>

          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
