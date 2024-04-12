import { useEffect, useState } from 'react';
import { Page } from '../types/Page';
import { fetchPages } from '../utils/fetch';

function useFetchPageData(pageSlug: string): Page | null {
  const [pageData, setPageData] = useState<Page | null>(null);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const pagesData = await fetchPages();
        const currentPage = pagesData.find((data) => data.pageSlug.current === pageSlug);

        if (currentPage) {
          setPageData(currentPage);
        } else {
          console.error(`Página "${pageSlug}" não encontrada na base de dados do Sanity`);
        }
      } catch (error) {
        console.error('Erro ao buscar as páginas:', error);
      }
    }

    fetchPageData();
  }, [pageSlug]); // Executar novamente o efeito quando o pageSlug mudar

  return pageData;
}

export default useFetchPageData;
