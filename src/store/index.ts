import { configureStore } from '@reduxjs/toolkit';

import authSlice from './modules/usuario';
import carrinhoSlice from './modules/carrinho';
import menuSlice from './modules/menu';

export const store = configureStore({
    reducer: { authSlice, carrinhoSlice, menuSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
