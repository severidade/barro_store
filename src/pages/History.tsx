// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import { Page } from '../types/Page';
import { fetchPages } from '../utils/fetch';
import sanityClient from '../cliente';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

function History() {
  const page = 'historia';
  const [pageData, setPageData] = useState<Page | null>(null); // paginas

  useEffect(() => {
    async function fetchPagesData() {
      try {
        const pagesData = await fetchPages();
        const currentPage = pagesData.find((data) => data.pageSlug.current === page);

        if (currentPage) {
          setPageData(currentPage);
        } else {
          console.error('Página de história não encontrada na base de dados do Sanity');
        }
      } catch (error) {
        console.error('Erro ao buscar as páginas:', error);
      }
    }

    fetchPagesData();
  }, []);

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
