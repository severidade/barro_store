/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
// import useFetchProductsByCategory from '../../customHooks/useFetchProductsByCategory';

// import useFetchCategories from '../../customHooks/useFetchCategories';
// import useFetchCategoryDetails from '../../customHooks/useFetchCategoryDetails';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { urlFor } from '../../utils/buildSanityImageUrl';
import { formatUrl } from '../../utils/formatUrl';
import useFetchProductsByCategory from '../../customHooks/useFetchProductsByCategory';
import { Product } from '../../types/Product';
import scrollToTop from '../../utils/scrollToTop';
import './ProductsByCategoryCarousel.css';

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
    slidesToScroll: 2,
    arrows: false,
    swipe: true,
  };

  const productsByCategory = useFetchProductsByCategory(categoryId || '');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
      </h2>
      <div className="related_carousel">
        <Slider { ...settings }>
          {filteredProducts.map((product) => (
            <div className="item" key={ product._id }>
              <Link
                to={ `/produtos/${categoryOfProduct}/${formatUrl(product.productName)}?productId=${product._id}` }
                key={ product._id }
                onClick={ scrollToTop }
                className="product_related_link"
              >
                <figure className="container_product_image">
                  <img
                    src={ urlFor(product.images[0].asset._ref).url() }
                    alt={ product.productName }
                  />
                </figure>
                {/* {product.productName} */}
              </Link>
              {/* <p className="produto">{product.productName}</p> */}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ProductsByCategoryCarousel;
