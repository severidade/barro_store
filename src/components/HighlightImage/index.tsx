import styles from './HighlightImage.module.css';
import { urlFor } from '../../utils/buildSanityImageUrl';

interface HighlightImageProps {
  imageUrl: string;
  isHeroImage: boolean;
}

function HighlightImage({ imageUrl, isHeroImage }: HighlightImageProps) {
  return (
    <figure
      className={ isHeroImage
        ? styles.hero_container_image
        : styles.footer_container_image }
    >
      <img src={ urlFor(imageUrl).url() } alt="Foto de destaque" />
    </figure>
  );
}

export default HighlightImage;
