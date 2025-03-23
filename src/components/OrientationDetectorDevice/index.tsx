/* eslint-disable max-len */
import { isBrowser } from 'react-device-detect';
import { useEffect, useState } from 'react';
import { useDeviceInfo } from './utils/useDeviceInfo';

import styles from './OrientationDetectorDevice.module.css';
import rotateDeviceImage from './img/girar_dispositivo.svg';

function OrientationDetectorDevice() {
  const { windowWidth, isMobile, windowHeight } = useDeviceInfo();
  const [mobileHorizontal, setMobileHorizontal] = useState(false);

  useEffect(() => {
    function checkHorizontalOrientation() {
      console.log(`
        a largura do meu navegador é ${windowWidth} e a altura é ${windowHeight}
        defini que isMobile é todo tela menor que 1024px. Esta tela é menor? ${isMobile}
      `);

      if (isMobile && windowWidth > windowHeight && !isBrowser) {
        setMobileHorizontal(true);
        document.body.style.overflow = 'hidden'; // Evita o scroll
      } else {
        setMobileHorizontal(false);
        document.body.style.overflow = 'auto'; // Habilita o scroll
      }
    }

    window.addEventListener('resize', checkHorizontalOrientation);

    checkHorizontalOrientation();

    return () => {
      window.removeEventListener('resize', checkHorizontalOrientation);
      document.body.style.overflow = 'auto'; // Garante o scroll de volta
    };
  }, [windowWidth, isMobile, windowHeight]);

  return (
    mobileHorizontal && (
      <div className={ ` ${styles.orientation_detector} ${mobileHorizontal ? styles.is_mobile_horizontal : ''}  ` }>
        <figure className={ styles.container_figure }>
          <img
            className={ `${styles.rotate_icon}` }
            src={ rotateDeviceImage }
            alt="Girar dispositivo"
          />
          <div className={ styles.msg }>
            Gire o dispositivo para a posição vertical e veja o conteúdo desta página
          </div>
        </figure>
      </div>
    )
  );
}

export default OrientationDetectorDevice;
