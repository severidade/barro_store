/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
// import useFetchProductsByCategory from '../../customHooks/useFetchProductsByCategory';

// import useFetchCategories from '../../customHooks/useFetchCategories';
// import useFetchCategoryDetails from '../../customHooks/useFetchCategoryDetails';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import { isBrowser } from 'react-device-detect';
import { urlFor } from '../../utils/buildSanityImageUrl';
import { formatUrl } from '../../utils/formatUrl';
import useFetchProductsByCategory from '../../customHooks/useFetchProductsByCategory';
import { Product } from '../../types/Product';
import scrollToTop from '../../utils/scrollToTop';
import './ProductsByCategoryCarousel.css';
import { useDeviceInfo } from '../../utils/useDeviceInfo';

interface FetchProductsByCategoryProps {
  categoryId: string | undefined;
  categoryOfProduct: string ;
  productId: string | undefined;
}

function ProductsByCategoryCarousel({ categoryId, categoryOfProduct, productId } : FetchProductsByCategoryProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    swipe: true,
  };

  const navigate = useNavigate();

  const handleNavigate = (productName: string, id: string) => {
    navigate(`/produtos/${categoryOfProduct}/${formatUrl(productName)}?productId=${id}`);
  };

  const productsByCategory = useFetchProductsByCategory(categoryId || '');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { isMobile } = useDeviceInfo();
  // const [mobileHorizontal, setMobileHorizontal] = useState(false);

  useEffect(() => {
    if (productsByCategory && productId) {
      const updatedProducts = productsByCategory.filter((product) => product._id !== productId);
      setFilteredProducts(updatedProducts);
    }
  }, [productsByCategory, productId]);

  return (
    <div className="container_related_products">
      <h2>
        mais produtos nesta categoria
        {' '}
      </h2>
      <div className="related_carousel">
        <Slider { ...settings }>
          {filteredProducts.map((product) => (
            <div className="item" key={ product._id }>
              {isBrowser && !isMobile ? (
              // Desktop: card sem link, com botão
                <div
                  className="product_related"
                >
                  <figure className="container_product_image">
                    <img
                      src={ urlFor(product.images[0].asset._ref).url() }
                      alt={ product.productName || 'Produto sem nome' }
                    />
                  </figure>
                  <p className="produto">{product.productName}</p>
                  <button
                    className="btn-desktop-only"
                    onClick={ () => {
                      handleNavigate(product.productName, product._id);
                      scrollToTop();
                    } }
                  >
                    Ver produto
                  </button>
                </div>
              ) : (
              // Mobile: card inteiro é um link
                <Link
                  to={ `/produtos/${categoryOfProduct}/${formatUrl(product.productName)}?productId=${product._id}` }
                  onClick={ scrollToTop }
                  className="product_related"
                >
                  <figure className="container_product_image">
                    <img
                      src={ urlFor(product.images[0].asset._ref).url() }
                      alt={ product.productName || 'Produto sem nome' }
                    />
                  </figure>
                  <p className="produto">{product.productName}</p>
                </Link>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ProductsByCategoryCarousel;
