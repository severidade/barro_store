// src/redux/reducers/favoriteProductsReducer.ts
import { FavoriteProduct } from '../types/Product';

const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: FavoriteProduct;
}

interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: string;
}

type FavoriteProductsActionTypes = AddFavoriteAction | RemoveFavoriteAction;

const initialState: FavoriteProduct[] = [];

export const addFavorite = (product: FavoriteProduct): AddFavoriteAction => ({
  type: ADD_FAVORITE,
  payload: product,
});

export const removeFavorite = (id: string): RemoveFavoriteAction => ({
  type: REMOVE_FAVORITE,
  payload: id,
});

const favoriteProductsReducer = (state = initialState, action: FavoriteProductsActionTypes): FavoriteProduct[] => {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.payload];
    case REMOVE_FAVORITE:
      return state.filter(product => product.id !== action.payload);
    default:
      return state;
  }
};

export default favoriteProductsReducer;
