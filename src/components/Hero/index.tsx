import HighlightImage from '../HighlightImage';
import CoverPage from '../HomeBranding';

import styles from './hero.module.css';

interface HeroProps {
  url: string;
}

function Hero({ url }: HeroProps) {
  return (
    <div className={ styles.container_hero }>
      <HighlightImage
        imageUrl={ url }
        imageType="homeHero"
      />
      <CoverPage />
    </div>
  );
}

export default Hero;
