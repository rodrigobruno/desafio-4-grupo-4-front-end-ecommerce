import React, { SyntheticEvent } from 'react';
import { Produtos } from 'types';
import { lidarComPlaceholder, precoFormatadoParaReal } from 'utils';
import { ImagemQuadrada, Preco, Produto, Titulo } from './style';
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
                <ImagemQuadrada
                    src={product.img}
                    alt={product.title}
                    onError={onImageError}
                    placeholderSrc={lidarComPlaceholder(product.img)}
                    effect='opacity'
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
