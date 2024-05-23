import HighlightImage from '../HighlightImage';
import HomeCoverPage from '../HomeCoverPage';

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
      <HomeCoverPage />
    </div>
  );
}

export default Hero;
