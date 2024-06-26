import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function ShoppingCart() {
  return (
    <>
      <NavBar />
      <div className="main">
        <h1>carrinho</h1>
        {/* <button onClick={ handleClick }>Voltar</button> */}
        <Footer />
      </div>
    </>
  );
}

export default ShoppingCart;
