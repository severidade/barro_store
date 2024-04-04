// Temporariamente tipando sanityClient como any
// @ts-ignore
import sanityClient from '../cliente.js';

interface Category {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

async function fetchData<T>(query: string, errorMessage: string): Promise<T> {
  try {
    const data: T = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url
  }`;
  const errorMessage = 'Ocorreu um erro ao buscar as categorias:';
  return fetchData<Category[]>(query, errorMessage);
}
