import { useParams } from 'react-router-dom';

function Page() {
  const { page } = useParams();

  console.log(page);
  return (
    <div className="main">
      <h1>Essa é uma página dinamica</h1>
    </div>
  );
}

export default Page;
