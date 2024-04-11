import BlockContent from '@sanity/block-content-to-react';
import ReactPlayer from 'react-player';
import useFetchPageData from '../customHooks/useFetchPageData';
import HighlightImage from '../components/HighlightImage';
import Footer from '../components/Footer';
import HighlightPhrase from '../components/HighlightPhrase';

function History() {
  const page = 'historia'; // talvez isso possa vir dinamicamente com useParams
  const pageData = useFetchPageData(page);

  if (!pageData) return <div className="main">Loading...</div>;

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
        <ReactPlayer
          className="video_background"
          url={ `https://www.youtube.com/watch?v=${youtubeVideoId}` }
          playing
          loop
          muted
          controls={ false }
          speed="2"
          width="100%"
          height="300px"
        />
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
