import Slider from 'react-slick';
import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { urlFor } from '../../utils/buildSanityImageUrl';
import styles from './ProductCarousel..module.css';

interface ProductCarouselProps {
  images: any[];
}

function ProductCarousel({ images }: ProductCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (currentSlide: number) => {
      setActiveSlide(currentSlide);
    },
  };

  return (
    <Slider { ...settings }>
      {images.map((image, index) => (
        <figure key={ index } className={ styles.product_image }>
          <img
            src={ urlFor(image).url() }
            alt={ `Imagem ${index + 1}` }
            isActive={ index === activeSlide }
          />
        </figure>
      ))}
    </Slider>
  );
}

export default ProductCarousel;
