import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import NavBar from './components/NavBar/index.tsx';
import Home from './pages/Home.tsx';
import History from './pages/History.tsx';
import Products from './pages/Products.tsx';
import Error from './pages/Error.tsx';
import ProductSingle from './pages/ProductSingle.tsx';

import { fetchPages } from './utils/fetch';
import { Page } from './types/Page.ts';

function App() {
  const [pages, setPages] = useState<Page[] | null>(null);

  useEffect(() => {
    async function fetchPagesData() {
      try {
        const pagesData = await fetchPages();
        setPages(pagesData);
      } catch (error) {
        console.error('Erro ao buscar as páginas:', error);
      }
    }

    fetchPagesData();
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/historia" element={ <History /> } />
        <Route path="/produtos" element={ <Products /> } />
        <Route path="/produtos/:category" element={ <Products /> } />
        <Route path="/produtos/:category/:productSingle" element={ <ProductSingle /> } />
        <Route path="*" element={ <Error /> } />
      </Routes>
    </>
  );
}

export default App;
