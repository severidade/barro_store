import styles from './HighlightImage.module.css';
import { urlFor } from '../../utils/buildSanityImageUrl';

interface HighlightImageProps {
  imageUrl: string;
  imageType: 'hero' | 'homeHero' | 'working_hours_image' | 'footer';
}

function HighlightImage({ imageUrl, imageType }: HighlightImageProps) {
  let containerClass = styles.footer_container_image;

  // if (isHomeHeroImage) {
  //   containerClass = styles.home_hero_container_image;
  // } else if (isHeroImage) {
  //   containerClass = styles.hero_container_image;
  // }

  if (imageType === 'hero') {
    containerClass = styles.hero_container_image;
  } else if (imageType === 'homeHero') {
    containerClass = styles.home_hero_container_image;
  } else if (imageType === 'working_hours_image') {
    containerClass = styles.working_hours_image;
  }

  return (
    <figure className={ containerClass }>
      <img src={ urlFor(imageUrl).url() } alt="Foto de destaque" />
    </figure>
  );
}

export default HighlightImage;
