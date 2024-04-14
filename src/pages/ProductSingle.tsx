/* eslint-disable max-len */
import { useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { urlFor } from '../utils/buildSanityImageUrl';
import { fetchProductById } from '../utils/fetch';

import { formatUrl } from '../utils/formatUrl';

import useFetchCategories from '../customHooks/useFetchCategories';
import Footer from '../components/Footer';

import { Product } from '../types/Product';
import { Category } from '../types/Category';
import scrollToTop from '../utils/scrollToTop';
import MainTitle from '../components/MainTitle';
import ProductTitle from '../components/ProductTitle';
import ProductCarousel from '../components/ProductCarousel';

function ProductSingle() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const productIdFromQuery = searchParams.get('productId');
  const { category } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const categoryList = useFetchCategories();
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

  const { title, description } = categoryDetails || {};
  const { productName } = product || {};

  return (
    <div className="main">
      <div className="container_page">
        <MainTitle title={ title || '' } />
        <p>{ description }</p>
        <ProductTitle productName={ productName || '' } />
        <ProductCarousel images={ product.images } name={ productName } />

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
      <Footer />
    </div>
  );
}

export default ProductSingle;
