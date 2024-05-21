import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/index.tsx';
import Home from './pages/Home.tsx';
import History from './pages/History.tsx';
import Products from './pages/Products.tsx';
import Error from './pages/Error.tsx';
import ProductSingle from './pages/ProductSingle.tsx';
import OrientationDetectorDevice from './components/OrientationDetectorDevice/index.tsx';

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/historia" element={ <History /> } />
        <Route path="/produtos" element={ <Error /> } />
        <Route path="/produtos/:category" element={ <Products /> } />
        <Route path="/produtos/:category/:productSingle" element={ <ProductSingle /> } />
        <Route path="*" element={ <Error /> } />
      </Routes>
      <OrientationDetectorDevice />
    </>
  );
}

export default App;
