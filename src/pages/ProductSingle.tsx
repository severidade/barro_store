/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../utils/fetch';

import { formatUrl } from '../utils/formatUrl';

import useFetchCategories from '../customHooks/useFetchCategories';
import Footer from '../components/Footer';

import { Product } from '../types/Product';
import { Category } from '../types/Category';
import MainTitle from '../components/MainTitle';
import ProductTitle from '../components/ProductTitle';
import ProductCarousel from '../components/ProductCarousel';
import ProductPrice from '../components/ProductPrice';
import LabelPromotional from '../components/LabelPromotional';
import CtaButton from '../components/CtaButton';
import ProductsByCategoryCarousel from '../components/ProductsByCategoryCarousel';

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

  const { title, description, _id } = categoryDetails || {};
  const { productName } = product || {};

  console.log(`Estou em product single ${_id}`);
  return (
    <>
      <div className="main">
        <div className="container_page">
          <MainTitle title={ title || '' } />

          <ProductTitle productName={ productName || '' } />
          <div className="product-details-wrapper">
            <ProductCarousel images={ product.images } name={ productName } />
            { product.promotion && product.promotion.isPromotional && (
              <LabelPromotional off={ product.promotion.discount || 0 } />
            )}
          </div>
          <ProductPrice
            price={ product.price }
            isPromotional={ product.promotion?.isPromotional || false }
            off={ product.promotion?.discount || 0 }
            payments={ product.installmentPayments || 0 }
          />
          <div className="container_cta">
            <CtaButton typeOfButton="addToCart" title="Comprar" />
            <CtaButton typeOfButton="addToFavorite" title="Favorito" />
          </div>
          <p>{ description }</p>
          {category && (
            <ProductsByCategoryCarousel categoryId={ _id } categoryOfProduct={ category } />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductSingle;
