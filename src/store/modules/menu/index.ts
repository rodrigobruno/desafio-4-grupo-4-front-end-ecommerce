import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alternar: false,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        mostrar: (state) => {
            state.alternar = true;
        },
        esconder: (state) => {
            state.alternar = false;
        },
    },
});

export const { mostrar, esconder } = menuSlice.actions;
export default menuSlice.reducer;
