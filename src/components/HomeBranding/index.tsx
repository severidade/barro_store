import styles from './CoverPage.module.css';

function CoverPage() {
  return (
    <div className={ styles.container_home_branding }>
      <h1 className={ styles.home_branding_logo }>Barro</h1>
      <p className={ styles.home_branding_social_slogan }>Vasos, Cerâmicas e Plantas</p>
    </div>
  );
}

export default CoverPage;
