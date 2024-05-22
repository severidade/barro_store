import styles from './home_branding.module.css';

function HomeBranding() {
  return (
    <div className={ styles.container_home_branding }>
      <p className={ styles.home_branding_social_slogan }>Vasos, Cerâmicas e Plantas</p>
      <h1 className={ styles.home_branding_logo }>Barro</h1>
      <ul className={ styles.home_branding_social_links }>
        <li>
          <a
            className={ styles.location }
            target="_blank"
            href=" #"
            rel="noreferrer"
          >
            Localização
          </a>
        </li>
        <li>
          <a
            className={ styles.whats_app }
            target="_blank"
            href=" #"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </li>
        <li>
          <a
            className={ styles.instagram }
            target="_blank"
            href=" #"
            rel="noreferrer"
          >
            instagram
          </a>
        </li>
      </ul>
    </div>
  );
}

export default HomeBranding;
