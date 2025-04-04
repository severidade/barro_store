/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RootState } from '../redux/store';
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
import NavBar from '../components/NavBar';

function ProductSingle() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productIdFromQuery = searchParams.get('productId');
  const { category } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const categoryList = useFetchCategories();
  const [categoryDetails, setCategoryDetails] = useState<Category | null>(null);

  const favoriteProducts = useSelector((state: RootState) => state.favoriteProducts ?? []);

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
  const currentUrl = window.location.href;

  const isFavorite = favoriteProducts.some((favProduct: { id: string }) => favProduct.id === product._id);

  // console.log(isFavorite);
  return (
    <>
      <Helmet>
        <title>{productName}</title>
        {/* {firstImage && <meta property="og:image" content={ firstImage } />} */}
        <meta property="og:title" content={ productName } />
        <meta property="og:description" content={ description || productName } />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={ window.location.href } />
      </Helmet>
      <NavBar />
      <div className="main">
        <div className="container_page single">
          <MainTitle title={ title || '' } />

          <ProductTitle productName={ productName || '' } />
          <div className="container_product_image">
            {isFavorite && <div className="favorite-label">Favorito</div>}
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
            <CtaButton typeOfButton="addToCart" title="Comprar" selectedProduct={ product } selectedProductUrl={ currentUrl } />
            <CtaButton typeOfButton="addToFavorite" title="Favorito" selectedProduct={ product } selectedProductUrl={ currentUrl } />
          </div>
          <p>{ description }</p>
          {category && (
            <ProductsByCategoryCarousel
              categoryId={ _id }
              categoryOfProduct={ category }
              productId={ product._id }
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductSingle;
