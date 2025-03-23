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
        <div className="products_page">
          <div className="container_title">
            <MainTitle title={ categoryDetails?.title || '' } />
          </div>
          {category && (
            <ProductLinks
              category={ category }
              products={ productsByCategory || [] }
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
