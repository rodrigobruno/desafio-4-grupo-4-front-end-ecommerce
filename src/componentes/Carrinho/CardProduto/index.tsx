import React, { SyntheticEvent } from 'react';
import { Trash3 } from 'react-bootstrap-icons';
import { Produtos } from 'types';
import { lidarComPlaceholder, precoFormatadoParaReal } from 'utils';
import { BotaoExcluir, Preco, Produto, Titulo, ImagemQuadrada } from './style';
import { useAppDispatch } from 'hooks';
import {
    adicionarQuantidade,
    removerProduto,
    removerQuantidade,
} from 'store/modules/carrinho';
import Placeholder from 'assets/placeholder.svg';
import AdicionarRemoverQuatidade from 'componentes/Quantidade';

export default function CardProdutoCarrinho({ product, quantity }: Produtos) {
    const dispatch = useAppDispatch();

    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        return ((e.target as HTMLImageElement).src = Placeholder);
    };

    const produto: Produtos = {
        product: {
            _id: product._id,
            title: product.title,
            img: product.img,
            price: product.price,
        },
        quantity: quantity,
    };

    const subTotal = precoFormatadoParaReal(product.price * quantity);

    const lidarComAdicionarQuantidadeProduto = () => {
        dispatch(adicionarQuantidade(produto));
    };

    const lidarComRemoverQuantidadeProduto = () => {
        dispatch(removerQuantidade(produto));
    };

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
                        <Preco>{subTotal}</Preco>

                        <AdicionarRemoverQuatidade
                            nome={product.title}
                            quntidade={quantity}
                            adicionar={lidarComAdicionarQuantidadeProduto}
                            remover={lidarComRemoverQuantidadeProduto}
                        />
                    </div>
                </div>

                <BotaoExcluir
                    variant='outline-light'
                    size='sm'
                    onClick={() => dispatch(removerProduto(produto))}
                >
                    <Trash3 className='bi' />
                    <span className='visually-hidden'>
                        Excluir {product.title}
                    </span>
                </BotaoExcluir>
            </Produto>
        </>
    );
}
