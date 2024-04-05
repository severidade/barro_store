// Temporariamente tipando sanityClient como any
// @ts-ignore
import sanityClient from '../cliente.js';
import { Category } from '../types/Category.ts';
import { Product } from '../types/Product.ts';

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

export async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "storeProduct"] | order(productName asc) {
    _id,
    productName,
    categories,
    images,
    price,
    promotion,
    installmentPayments
  }`;

  const errorMessage = 'Ocorreu um erro ao buscar os produtos:';

  return fetchData<Product[]>(query, errorMessage);
}

export async function fetchProductById(productId: string): Promise<Product | null> {
  const query = `*[_type == "storeProduct" && _id == $productId][0] {
    _id,
    productName,
    categories,
    images,
    price,
    promotion,
    installmentPayments
  }`;

  const params = { productId };

  const errorMessage = 'Ocorreu um erro ao buscar o produto:';

  return fetchData<Product>(query, errorMessage);
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const query = `
    *[_type == "storeProduct" && references("${categoryId}")]
    | order(productName asc) {
      _id,
      productName,
      categories,
      images,
      price,
      promotion,
      installmentPayments
    }
  `;

  const errorMessage = 'Ocorreu um erro ao buscar os produtos por categoria:';

  return fetchData<Product[]>(query, errorMessage);
}
