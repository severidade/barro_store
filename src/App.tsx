/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from './cliente.js';
import { fetchCategories, fetchProducts, fetchProductsByCategory } from './utils/fetch';
import { Category } from './types/Category.ts';
import { Product } from './types/Product.ts';

import './App.css';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

function App() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
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
    async function fetchAllProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        // Lida com o erro na busca dos posts para o carrossel
      }
    }

    fetchAllProducts();
  }, []);

  const categoryId = 'f8bc66bb-c92d-4c52-818f-9c984326fce8';

  useEffect(() => {
    async function fetchAllProductsByCategory() {
      try {
        const data = await fetchProductsByCategory(categoryId);
        setProductsByCategory(data);
      } catch (error) {
        // Lida com o erro na busca dos posts para o carrossel
      }
    }

    fetchAllProductsByCategory();
  }, []);

  if (!categories) return <div className="loading">Loading...</div>;
  // if (categories === null) return <div className="loading">Loading...</div>;

  console.log(categories);
  console.log(products);
  console.log(productsByCategory);

  return (
    <>
      <h1>home</h1>
      <ul>
        {categories.map((category) => (
          <li key={ category._id }>
            <p>{ category._id }</p>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <img src={ category.imageUrl } alt={ category.title } />
          </li>
        ))}
      </ul>

      <h1>Produtos por Categoria</h1>
      <ul>
        {productsByCategory && productsByCategory.map((product) => (
          <li key={ product._id }>
            <h3>{product.productName}</h3>
            <p>
              Preço:
              {product.price}
            </p>
            <p>
              Promoção:
              {product.promotion && product.promotion.isPromotional ? 'Sim' : 'Não'}
            </p>
            {product.promotion && product.promotion.isPromotional && (
              <p>
                Desconto:
                {product.promotion.discount}
                %
              </p>
            )}
            <div className="product_container">
              {product.images.map((image, index) => (
                <figure key={ index } className="product_image">
                  <img
                    src={ urlFor(image).url() }
                    alt={ `Imagem ${index + 1}` }
                  />
                </figure>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
