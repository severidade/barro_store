/* eslint-disable max-len */
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, History, Products, ProductSingle, Error, ShoppingCart, FavoriteProducts } from './pages/index.tsx';
import OrientationDetectorDevice from './components/OrientationDetectorDevice/index.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/historia" element={ <History /> } />
        <Route path="/produtos" element={ <Error /> } />
        <Route path="/produtos/:category" element={ <Products /> } />
        <Route path="/produtos/:category/:productSingle" element={ <ProductSingle /> } />
        <Route path="/shopping" element={ <ShoppingCart /> } />
        <Route path="/favoritos" element={ <FavoriteProducts /> } />
        <Route path="*" element={ <Error /> } />
      </Routes>
      <OrientationDetectorDevice />
    </>
  );
}

export default App;
