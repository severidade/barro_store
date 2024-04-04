import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.tsx';
import History from './pages/History.tsx';
import Error from './pages/Error.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/historia" element={ <History /> } />
      <Route path="*" element={ <Error /> } />
    </Routes>
  );
}

export default App;
