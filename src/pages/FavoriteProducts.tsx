import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import MainTitle from '../components/MainTitle/index.tsx';
import FavoriteProductList from '../components/FavoriteProductList/index.tsx';

function FavoriteProducts() {
  return (
    <>
      <NavBar />
      <div className="main">
        <div className="container_page single">
          <MainTitle title="Produtos Favoritos" />
          <FavoriteProductList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FavoriteProducts;
