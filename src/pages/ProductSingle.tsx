import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../utils/fetch';

import { Product } from '../types/Product';

function ProductSingle() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const productIdFromQuery = searchParams.get('productId');
  const { category } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // eslint-disable-next-line max-len
        const data = productIdFromQuery ? await fetchProductById(productIdFromQuery) : null;
        setProduct(data);
      } catch (error) {
        // Lida com o erro na busca dos posts para o carrossel
      }
    }
    fetchProduct();
  }, [productIdFromQuery]);

  function handleClick() {
    navigate(-1);
  }

  console.log(category);
  return (
    <div>
      <h1>
        {product ? product.productName : ''}
      </h1>
      <p>
        ID do Produto (a partir dos parâmetros de consulta):
        {' '}
        {productIdFromQuery}
      </p>

      {/* esse botao é temporário */}
      <button onClick={ handleClick }>Voltar</button>
    </div>
  );
}

export default ProductSingle;
