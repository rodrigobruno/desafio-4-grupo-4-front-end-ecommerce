import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Produtos } from 'types';

const carrinhoLocalStorage = localStorage.getItem(
    '@autenticacao-react:carrinho'
);
const carrnhoInitialState = carrinhoLocalStorage
    ? JSON.parse(carrinhoLocalStorage)
    : [];

interface CarrinhoState {
    carrinho: Produtos[];
}

const initialState: CarrinhoState = {
    carrinho: carrnhoInitialState,
};

export const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        adicionarProduto: (state, action: PayloadAction<Produtos>) => {
            const { _id } = action.payload.product;
            const carrinho = state.carrinho;

            const estaDuplicado = carrinho.some(
                (item) => item.product._id === _id
            );

            if (estaDuplicado) {
                const posicao = carrinho.findIndex(
                    (item) => item.product._id === _id
                );
                carrinho[posicao].quantity++;
            } else {
                state.carrinho = [...carrinho, action.payload];
            }

            localStorage.setItem(
                '@autenticacao-react:carrinho',
                JSON.stringify(state.carrinho)
            );
        },
        removerProduto: (state, action: PayloadAction<Produtos>) => {
            const { _id } = action.payload.product;

            const novoCarrinho = state.carrinho.filter(
                (carrinho) => carrinho.product._id !== _id
            );

            state.carrinho = novoCarrinho;

            localStorage.setItem(
                '@autenticacao-react:carrinho',
                JSON.stringify(state.carrinho)
            );
        },
        adicionarQuantidade: (state, action) => {
            const { _id } = action.payload.product;
            const carrinho = state.carrinho;

            const posicao = carrinho.findIndex(
                (item) => item.product._id === _id
            );

            carrinho[posicao].quantity++;

            localStorage.setItem(
                '@autenticacao-react:carrinho',
                JSON.stringify(state.carrinho)
            );
        },
        removerQuantidade: (state, action) => {
            const { _id } = action.payload.product;
            const carrinho = state.carrinho;

            const posicao = carrinho.findIndex(
                (item) => item.product._id === _id
            );

            if (carrinho[posicao].quantity > 1) {
                carrinho[posicao].quantity--;
            }

            localStorage.setItem(
                '@autenticacao-react:carrinho',
                JSON.stringify(state.carrinho)
            );
        },
        esvaziarCarrinho: (state) => {
            state.carrinho = [];
            localStorage.removeItem('@autenticacao-react:carrinho');
        },
    },
});

export const {
    adicionarProduto,
    removerProduto,
    adicionarQuantidade,
    removerQuantidade,
    esvaziarCarrinho,
} = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
