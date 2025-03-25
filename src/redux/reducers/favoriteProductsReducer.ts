/* eslint-disable max-len */
import { FavoriteProduct } from '../types/Product';

const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

// Definição dos tipos de ações
interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: FavoriteProduct; // Produto a ser adicionado
}

interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: string; // ID do produto a ser removido
}

type FavoriteProductsActionTypes = AddFavoriteAction | RemoveFavoriteAction;

// Estado inicial: uma lista vazia de favoritos
const initialState: FavoriteProduct[] = [];

// Criando as actions (ações que modificam o estado)
export const addFavorite = (product: FavoriteProduct): AddFavoriteAction => ({
  type: ADD_FAVORITE,
  payload: product,
});

export const removeFavorite = (id: string): RemoveFavoriteAction => ({
  type: REMOVE_FAVORITE,
  payload: id,
});

// O reducer em si
const favoriteProductsReducer = (state = initialState, action: FavoriteProductsActionTypes): FavoriteProduct[] => {
  console.log('Reducer Action:', action);
  switch (action.type) {
    case ADD_FAVORITE:
      // Verifica se o produto já está nos favoritos
      const isProductAlreadyFavorite = state.some((product) => product.id === action.payload.id);
      if (isProductAlreadyFavorite) {
        window.alert('Este produto já está na sua lista de favoritos!');
        return state; // Retorna o estado atual sem modificar nada
      }

      console.log('Adding to favorites:', action.payload);
      return [...state, action.payload]; // Retorna um novo array com o novo produto adicionado

    case REMOVE_FAVORITE:
      return state.filter((product) => product.id !== action.payload); // Remove o produto com base no ID

    default:
      return state; // Retorna o estado inalterado se a ação não for reconhecida
  }
};

export default favoriteProductsReducer;
