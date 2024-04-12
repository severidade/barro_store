import BlockContent from '@sanity/block-content-to-react';
import useFetchPageData from '../customHooks/useFetchPageData';
import HighlightImage from '../components/HighlightImage';
import Footer from '../components/Footer';
import HighlightPhrase from '../components/HighlightPhrase';
import VideoPlayer from '../components/VideoPlayer';

function History() {
  const page = 'historia'; // talvez isso possa vir dinamicamente com useParams
  const pageData = useFetchPageData(page);

  if (!pageData) {
    return (
      <div className="main">
        <div className="loading">Loading...</div>
        <Footer />
      </div>
    );
  }

  const youtubeVideoId = pageData.video?.youtubeId;

  return (
    <div className="main">
      <HighlightImage
        imageUrl={ pageData.highlightImageUrl }
        isHeroImage
      />
      <div className="container_page">
        <h1>{ pageData.pageTitle}</h1>
        <HighlightPhrase phrase={ pageData.highlightPhrase } />
        {youtubeVideoId && <VideoPlayer id={ youtubeVideoId } />}
        <BlockContent blocks={ pageData.pageContent } />
      </div>
      <HighlightImage
        imageUrl={ pageData.footerImage }
        isHeroImage={ false }
      />
      <Footer />
    </div>
  );
}

export default History;
