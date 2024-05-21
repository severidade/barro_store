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
            imageType="hero"
            // isHeroImage
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
        <section className="working_hours">
          <div className="content_working_hours">

            <HighlightImage
              imageUrl={ footerImage }
              imageType="homeHero"
            />
            <h2 className="highlight_phrase_home">{ highlightPhrase}</h2>
            <BlockContent blocks={ pageContent } />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Home;
