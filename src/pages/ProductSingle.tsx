import { useParams, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { fetchProductById } from '../utils/fetch';

// import { Product } from '../types/Product';

function ProductSingle() {
  const location = useLocation();
  const { productId } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const productIdFromQuery = searchParams.get('productId');

  // const [product, setProduct] = useState<Product[] | null>(null);

  // useEffect(() => {
  //   async function fetchAllProductsByCategory() {
  //     try {
  //       const data = await fetchProductById(productIdFromQuery);
  //       setProduct(data);
  //     } catch (error) {
  //       // Lida com o erro na busca dos posts para o carrossel
  //     }
  //   }
  //   fetchAllProductsByCategory();
  // }, []);

  console.log(productId);
  // console.log(product);
  return (
    <div>
      <h2>Detalhes do Produto</h2>
      <p>
        ID do Produto (a partir dos parâmetros de consulta):
        {' '}
        {productIdFromQuery}
      </p>
    </div>
  );
}

export default ProductSingle;
