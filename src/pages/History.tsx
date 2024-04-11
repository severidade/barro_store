import BlockContent from '@sanity/block-content-to-react';
import { urlFor } from '../utils/buildSanityImageUrl';
import useFetchPageData from '../customHooks/useFetchPageData';
import Footer from '../components/Footer';

function History() {
  const page = 'historia'; // talvez isso possa vir dinamicamente com useParams
  const pageData = useFetchPageData(page);

  if (!pageData) return <div className="main">Loading...</div>;

  return (
    <div className="main">
      <div className="container_page">
        <h1>{ pageData.pageTitle}</h1>
        <p>{ pageData.highlightPhrase}</p>
        <figure>
          <img
            src={ urlFor(pageData.highlightImageUrl).url() }
            alt="Foto de destaque"
          />
        </figure>
        <BlockContent blocks={ pageData.pageContent } />
      </div>
      <Footer />
    </div>
  );
}

export default History;
