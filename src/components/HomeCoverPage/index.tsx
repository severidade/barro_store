import { useRef } from 'react';
import Lottie from 'lottie-react';
import styles from './HomeCoverPage.module.css';
import ShowMoreBg from './lottie/ShowMoreBg.json';
// import Arrow from './lottie/arow.json';

function HomeCoverPage() {
  const homeWorkingHoursRef = useRef<HTMLDivElement>(null);

  const scrollToHomeWorkingHours = () => {
    homeWorkingHoursRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={ styles.container_home_branding }>

      <div className={ styles.lottie_wrapper }>

        <button className={ styles.explore } onClick={ scrollToHomeWorkingHours }>
          Explorar
        </button>
        <Lottie
          className={ styles.show_more_bg }
          animationData={ ShowMoreBg }
          loop={ false }
        />
      </div>

      {/* <button className={ styles.explore } onClick={ scrollToHomeWorkingHours }>
        <Lottie
          className={ styles.lottie_animation }
          animationData={ ShowMore }
          loop={ false }
        />
        <Lottie
          className={ styles.lottie_animation_arrow }
          animationData={ Arrow }
          loop
        />
        Explorar
      </button> */}
      <h1 className={ styles.home_branding_logo }>Barro</h1>
      <p className={ styles.home_branding_social_slogan }>Vasos, Cerâmicas e Plantas</p>

      <div ref={ homeWorkingHoursRef } />
    </div>
  );
}

export default HomeCoverPage;
