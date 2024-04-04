/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { fetchCategories } from './utils/fetch';
import { Category } from './types/Category.ts';
import './App.css';

function App() {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    async function fetchCarouselPostsData() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        // Lida com o erro na busca dos posts para o carrossel
      }
    }

    fetchCarouselPostsData();
  }, []);

  if (!categories) return <div className="loading">Loading...</div>;
  // if (categories === null) return <div className="loading">Loading...</div>;

  console.log(categories);

  return (
    <>
      <h1>home</h1>
      <ul>
        {categories.map((category) => (
          <li key={ category._id }>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <img src={ category.imageUrl } alt={ category.title } />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
