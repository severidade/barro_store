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
// import ProductLinks from '../ProductLinks';
import { Product } from '../../types/Product';
import scrollToTop from '../../utils/scrollToTop';

interface FetchProductsByCategoryProps {
  categoryId: string | undefined;
  categoryOfProduct: string ;
  productId: string | undefined;
}

function ProductsByCategoryCarousel({ categoryId, categoryOfProduct, productId } : FetchProductsByCategoryProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    swipe: true,
    // centerMode: true,
  };

  const productsByCategory = useFetchProductsByCategory(categoryId || '');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productsByCategory && productId) {
      // eslint-disable-next-line no-underscore-dangle
      const updatedProducts = productsByCategory.filter((product) => product._id !== productId);
      setFilteredProducts(updatedProducts);
    }
  }, [productsByCategory, productId]);

  return (
    <>
      <h1>
        Veja mais produtos nesta categoria
      </h1>
      {/* <ProductLinks
        category={ categoryOfProduct }
        products={ filteredProducts || [] }
      /> */}
      <Slider { ...settings }>
        {filteredProducts.map((product) => (
          <div className="slider_item" key={ product._id }>
            <Link
              to={ `/produtos/${categoryOfProduct}/${formatUrl(product.productName)}?productId=${product._id}` }
              key={ product._id }
              onClick={ scrollToTop }
              className="slider_fff"
            >
              <figure className="categori">
                <img
                  src={ urlFor(product.images[0].asset._ref).url() }
                  alt={ product.productName }
                />
              </figure>
              {product.productName}
            </Link>
            {/* <p className="produto">{product.productName}</p> */}
          </div>
        ))}
      </Slider>
    </>
  );
}

export default ProductsByCategoryCarousel;
