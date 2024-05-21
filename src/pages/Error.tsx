import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Error() {
  // const navigate = useNavigate();
  // function handleClick() {
  //   navigate(-1);
  // }
  return (
    <>
      <NavBar />
      <div className="main">
        <h1>Página de Erro</h1>
        {/* <button onClick={ handleClick }>Voltar</button> */}
      </div>
    </>
  );
}

export default Error;
