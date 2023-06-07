import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Usuario, UsuarioState } from 'types';

const id = Number(localStorage.getItem('@autenticacao-react:id')) || null;
const ehAdmin =
    localStorage.getItem('@autenticacao-react:ehAdmin') === 'true' || null;
const token = localStorage.getItem('@autenticacao-react:token') || null;

const initialState: UsuarioState = {
    _id: id,
    username: null,
    email: null,
    isAdmin: ehAdmin,
    createdAt: null,
    updatedAt: null,
    __v: null,
    accessToken: token,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Usuario>) => {
            localStorage.setItem(
                '@autenticacao-react:id',
                JSON.stringify(action.payload._id)
            );
            localStorage.setItem(
                '@autenticacao-react:ehAdmin',
                JSON.stringify(action.payload.isAdmin)
            );
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
            localStorage.removeItem('@autenticacao-react:id');
            localStorage.removeItem('@autenticacao-react:ehAdmin');
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
        },
    },
});

export const { login, logout, setUsuario } = authSlice.actions;
export default authSlice.reducer;
