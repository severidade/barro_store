import { configureStore } from '@reduxjs/toolkit';
import favoriteProductsReducer from './reducers/favoriteProductsReducer';

export const store = configureStore({
  reducer: {
    favoriteProducts: favoriteProductsReducer, // Cria o reducer
  },
});

// Monitorar mudanças no estado global
store.subscribe(() => {
  console.log('Current Redux State:', store.getState());
});

// Tipos auxiliares para Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
