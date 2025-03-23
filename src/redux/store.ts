import { legacy_createStore as createStore, combineReducers } from 'redux';
import favoriteProductsReducer from './reducers/favoriteProductsReducer';

const rootReducer = combineReducers({
  favoriteProducts: favoriteProductsReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;