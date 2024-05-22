import BlockContent from '@sanity/block-content-to-react';
import useFetchPageData from '../customHooks/useFetchPageData';
import HighlightImage from '../components/HighlightImage';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import HomeBranding from '../components/HomeBranding';
import Hero from '../components/Hero';

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

  const {
    highlightPhrase,
    pageContent,
    highlightImageUrl,
    footerImage,
  } = pageData || {};

  return (
    <>
      <NavBar />
      <div className="main home">
        <Hero url={ highlightImageUrl } />
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
