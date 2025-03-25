import { configureStore } from '@reduxjs/toolkit';
import favoriteProductsReducer from './reducers/favoriteProductsReducer';

export const store = configureStore({
  reducer: {
    favoriteProducts: favoriteProductsReducer,
  },
});
store.subscribe(() => {
  console.log('Current Redux State:', store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
