import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }
  return (
    <>
      <h1>Página de Erro</h1>
      <button onClick={ handleClick }>Voltar</button>
    </>
  );
}

export default Error;
