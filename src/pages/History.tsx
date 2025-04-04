import BlockContent from '@sanity/block-content-to-react';
import useFetchPageData from '../customHooks/useFetchPageData';
import HighlightImage from '../components/HighlightImage';
import Footer from '../components/Footer';
import HighlightPhrase from '../components/HighlightPhrase';
import VideoPlayer from '../components/VideoPlayer';
import MainTitle from '../components/MainTitle';
import NavBar from '../components/NavBar';

function History() {
  const page = 'historia'; // talvez isso possa vir dinamicamente com useParams
  const pageData = useFetchPageData(page);

  if (!pageData) {
    return (
      <div className="main">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  const youtubeVideoId = pageData.video?.youtubeId;
  const {
    pageTitle,
    highlightPhrase,
    highlightImageUrl,
    pageContent,
    footerImage,
  } = pageData || {};

  return (
    <>
      <NavBar page={ page } />
      <div className="main">
        <HighlightImage
          imageUrl={ highlightImageUrl }
          imageType="hero"
        />
        <div className="container_page">
          <MainTitle title={ pageTitle || '' } />
          <HighlightPhrase phrase={ highlightPhrase } />
          {youtubeVideoId && <VideoPlayer id={ youtubeVideoId } />}
          <BlockContent blocks={ pageContent } />
        </div>
        <HighlightImage
          imageUrl={ footerImage }
          imageType="footer"
        />
      </div>
      <Footer />
    </>
  );
}

export default History;
