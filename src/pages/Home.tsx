import useFetchPageData from '../customHooks/useFetchPageData';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import HomeWorkingHours from '../components/HomeWorkingHours';

function Home() {
  const page = 'home';
  const pageData = useFetchPageData(page);

  if (!pageData) {
    return (
      <div className="main">
        <div className="loading">Loading...</div>
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
      <NavBar page={ page } />
      <div className="main home">
        <Hero url={ highlightImageUrl } />
        <HomeWorkingHours
          url={ footerImage }
          phrase={ highlightPhrase }
          content={ pageContent }
        />
        <Footer />
      </div>
    </>
  );
}

export default Home;
