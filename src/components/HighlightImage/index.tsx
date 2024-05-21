import styles from './HighlightImage.module.css';
import { urlFor } from '../../utils/buildSanityImageUrl';

interface HighlightImageProps {
  imageUrl: string;
  isHeroImage: boolean;
  isHomeHeroImage: boolean;
}

function HighlightImage({ imageUrl, isHeroImage, isHomeHeroImage }: HighlightImageProps) {
  let containerClass = styles.footer_container_image;

  if (isHomeHeroImage) {
    containerClass = styles.home_hero_container_image;
  } else if (isHeroImage) {
    containerClass = styles.hero_container_image;
  }

  return (
    <figure className={ containerClass }>
      <img src={ urlFor(imageUrl).url() } alt="Foto de destaque" />
    </figure>
  );
}

export default HighlightImage;
