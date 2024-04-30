import { useEffect, useState } from 'react';
import './OrientationDetectorDevice.css';

import rotateDeviceImage from './img/girar_dispositivo.svg';

function OrientationDetectorDevice() {
  const [mobileHorizontal, setMobileHorizontal] = useState(false);

  useEffect(() => {
    function checkHorizontalOrientation() {
      const largura = window.innerWidth;
      const altura = window.innerHeight;
      const maxWidthMobile = 500;

      if (largura > altura && altura < maxWidthMobile) {
        setMobileHorizontal(true);
        document.body.classList.add('no_scroll');
      } else {
        setMobileHorizontal(false);
        document.body.classList.remove('no_scroll');
      }
    }

    window.addEventListener('resize', checkHorizontalOrientation);

    // Quando o componente é montado
    checkHorizontalOrientation();

    // Remover o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', checkHorizontalOrientation);
    };
  }, []);

  return (
    <div
      className={ `orientation_detector ${mobileHorizontal
        ? 'is_mobile_horizontal'
        : ''}`.trim() }
    >
      <figure className="container_figure">
        <img className="rotate_icon" src={ rotateDeviceImage } alt="girar dispositivo" />
        <div className="msg">
          Gire o dispositivo para a posição vertical e veja o conteúdo desta página
        </div>
      </figure>
    </div>
  );
}

export default OrientationDetectorDevice;
