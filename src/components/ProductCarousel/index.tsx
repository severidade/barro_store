import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomPaging from './CustomPaging';
import { urlFor } from '../../utils/buildSanityImageUrl';
import './ProductCarousel.css';

interface ProductCarouselProps {
  images: any[];
  name: string;
}

function ProductCarousel({ images, name }: ProductCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    customPaging: CustomPaging(images),
  };

  return (
    images.length === 1 ? (
      <figure className="product_image_single">
        <img
          src={ urlFor(images[0]).url() }
          alt={ name }
        />
      </figure>
    ) : (
      <Slider { ...settings }>
        {images.map((image, index) => (
          <figure key={ index } className="product_image_carousel">
            <img
              src={ urlFor(image).url() }
              alt={ `${name} ${index + 1}` }
            />
          </figure>
        ))}
      </Slider>
    )
  );
}

export default ProductCarousel;
