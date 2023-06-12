import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Usuario, UsuarioState } from 'types';

const token = localStorage.getItem('@autenticacao-react:token') || null;

const initialState: UsuarioState = {
    _id: null,
    username: null,
    email: null,
    isAdmin: null,
    createdAt: null,
    updatedAt: null,
    __v: null,
    accessToken: token,
    carregando: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Usuario>) => {
            localStorage.setItem(
                '@autenticacao-react:token',
                action.payload.accessToken
            );

            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            localStorage.removeItem('@autenticacao-react:token');

            state._id = null;
            state.username = null;
            state.email = null;
            state.isAdmin = null;
            state.accessToken = null;
        },
        setUsuario: (state, action: PayloadAction<Usuario>) => {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            //state.accessToken = action.payload.accessToken;
        },
        carregado: (state) => {
            state.carregando = false;
        },
    },
});

export const { login, logout, setUsuario, carregado } = authSlice.actions;
export default authSlice.reducer;
