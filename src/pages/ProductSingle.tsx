/* eslint-disable max-len */
import { useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import { useEffect, useState } from 'react';
import { fetchProductById, fetchCategories } from '../utils/fetch';
import sanityClient from '../cliente';

import { formatUrl } from '../utils/formatUrl';

import { Product } from '../types/Product';
import { Category } from '../types/Category';
import scrollToTop from '../utils/scrollToTop';

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
  const [categoryList, setCategories] = useState<Category[] | null>(null);
  const [categoryDetails, setCategoryDetails] = useState<Category | null>(null);

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

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }
    fetchAllCategories();
  }, []);

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

  if (!product) return <div className="loading">Loading...</div>;

  // console.log(category);
  // console.log(categoryList);
  // console.log(categoryDetails);

  return (
    <div className="main">
      <h1>{ categoryDetails?.title }</h1>
      <p>{ categoryDetails?.description }</p>
      <h2>{product.productName}</h2>
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
      <div className="container_cta">
        <button> Adicionar ao carrinho </button>
        <button> Favoritar produto</button>
      </div>
      <NavLink
        to={ `/produtos/${category}` }
        onClick={ scrollToTop }
      >
        Ver mais produtos desta categoria
      </NavLink>
    </div>
  );
}

export default ProductSingle;
