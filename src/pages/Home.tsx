import BlockContent from '@sanity/block-content-to-react';
import useFetchPageData from '../customHooks/useFetchPageData';
import HighlightImage from '../components/HighlightImage';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function Home() {
  const page = 'home';

  const pageData = useFetchPageData(page);

  if (!pageData) {
    return (
      <div className="main">
        <div className="loading">Loading...</div>
        <Footer />
      </div>
    );
  }

  console.log(pageData);

  const {
    highlightPhrase,
    pageContent,
    highlightImageUrl,
    footerImage,
  } = pageData || {};

  return (
    <>
      <NavBar />
      <div className="main">
        <section className="hero">
          <HighlightImage
            imageUrl={ highlightImageUrl }
            isHeroImage
          />
          <p>Vasos, Cerâmicas e Plantas</p>
          <h1>Barro</h1>
          <div className="hero_container_logo">
            <ul>
              <li>Localização</li>
              <li>WhatsApp</li>
              <li>Instagram</li>
            </ul>
          </div>
        </section>
        <HighlightImage
          imageUrl={ footerImage }
          isHeroImage={ false }
        />
        <h1>{ highlightPhrase}</h1>
        <BlockContent blocks={ pageContent } />
        <Footer />
      </div>
    </>
  );
}

export default Home;
