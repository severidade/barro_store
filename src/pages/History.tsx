import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import sanityClient from '../cliente';
import useFetchPageData from '../customHooks/useFetchPageData';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

function History() {
  const page = 'historia'; // talvez isso possa vir dinamicamente com useParams
  const pageData = useFetchPageData(page);

  if (!pageData) return <div className="main">Loading...</div>;

  return (
    <div className="main">
      <h1>{ pageData.pageTitle}</h1>
      <p>{ pageData.highlightPhrase}</p>
      <figure>
        <img
          src={ urlFor(pageData.highlightImageUrl).url() }
          alt="Foto de destaque"
        />
      </figure>
      <div>
        <BlockContent blocks={ pageData.pageContent } />
      </div>
      <footer>
        <p>Rua das Flores, 73 - Boa Vista</p>
        <p> Jaboticatubas | MG</p>
      </footer>
    </div>
  );
}

export default History;
