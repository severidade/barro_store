import { useRef } from 'react';
import styles from './HomeCoverPage.module.css';

function HomeCoverPage() {
  const homeWorkingHoursRef = useRef<HTMLDivElement>(null);

  const scrollToHomeWorkingHours = () => {
    homeWorkingHoursRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={ styles.container_home_branding }>
      <button className={ styles.explore } onClick={ scrollToHomeWorkingHours }>
        Explorar
      </button>
      <h1 className={ styles.home_branding_logo }>Barro</h1>
      <p className={ styles.home_branding_social_slogan }>Vasos, Cerâmicas e Plantas</p>

      <div ref={ homeWorkingHoursRef } />
    </div>
  );
}

export default HomeCoverPage;
