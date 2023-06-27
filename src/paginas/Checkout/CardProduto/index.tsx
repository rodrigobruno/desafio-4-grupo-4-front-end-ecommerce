import React, { SyntheticEvent } from 'react';
import { Produtos } from 'types';
import { precoFormatadoParaReal } from 'utils';
import { Preco, Produto, Titulo } from './style';
import Placeholder from 'assets/placeholder.svg';

export default function CardProdutoCarrinho({ product, quantity }: Produtos) {
    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        return ((e.target as HTMLImageElement).src = Placeholder);
    };

    const preco = precoFormatadoParaReal(product.price);
    const subTotal = precoFormatadoParaReal(product.price * quantity);

    return (
        <>
            <Produto>
                <img
                    src={product.img}
                    alt={product.title}
                    onError={onImageError}
                />

                <div>
                    <Titulo>{product.title}</Titulo>

                    <div className='d-flex'>
                        <Preco>
                            {quantity} x {preco} = {subTotal}
                        </Preco>
                    </div>
                </div>
            </Produto>
        </>
    );
}
