/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useParams } from 'react-router-dom';
import useFetchCategories from '../customHooks/useFetchCategories';
import useFetchCategoryDetails from '../customHooks/useFetchCategoryDetails';
import useFetchProductsByCategory from '../customHooks/useFetchProductsByCategory';

import ProductLinks from '../components/ProductLinks';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import MainTitle from '../components/MainTitle';

function Products() {
  const { category } = useParams();

  const categoryList = useFetchCategories();
  const categoryDetails = useFetchCategoryDetails(categoryList, category);
  // const productsByCategory = useFetchProductsByCategory(categoryDetails);
  const productsByCategory = useFetchProductsByCategory(categoryDetails ? categoryDetails._id : null);

  console.log(categoryDetails);

  return (
    <>
      <NavBar />
      <div className="main">
        <MainTitle title={ categoryDetails?.title || '' } />

        {category && (
          <ProductLinks
            category={ category }
            products={ productsByCategory || [] }
          />
        )}

      </div>
      <Footer />
    </>
  );
}

export default Products;
