import NavBar from '../components/NavBar';

function ShoppingCart() {
  // const navigate = useNavigate();
  // function handleClick() {
  //   navigate(-1);
  // }
  return (
    <>
      <NavBar />
      <div className="main">
        <h1>carrinho</h1>
        {/* <button onClick={ handleClick }>Voltar</button> */}
      </div>
    </>
  );
}

export default ShoppingCart;
