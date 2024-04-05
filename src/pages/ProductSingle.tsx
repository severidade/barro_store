/* eslint-disable max-len */
import { useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../utils/fetch';
import sanityClient from '../cliente.js';

import { Product } from '../types/Product';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

function ProductSingle() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const productIdFromQuery = searchParams.get('productId');
  const { category } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  function handleClick() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = productIdFromQuery ? await fetchProductById(productIdFromQuery) : null;
        if (!data) {
          navigate('/error');
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    }
    fetchProduct();
  }, [productIdFromQuery, navigate]);

  if (!product) return <div className="loading">Loading...</div>;

  return (

    <div>
      <h1>{product.productName}</h1>

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
      <p>
        Preço:
        {' '}
        {product.price}
      </p>
      <p>
        Promoção:
        {' '}
        {product.promotion && product.promotion.isPromotional ? 'Sim' : 'Não'}
      </p>
      {product.promotion && product.promotion.isPromotional && (
        <p>
          Desconto:
          {' '}
          {product.promotion.discount}
          %
        </p>
      )}

      <NavLink to={ `/produtos/${category}` }>
        Ver mais produtos desta categoria
      </NavLink>
    </div>
  );
}

export default ProductSingle;
