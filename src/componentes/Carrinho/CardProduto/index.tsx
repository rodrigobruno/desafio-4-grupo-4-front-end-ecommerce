import React, { SyntheticEvent } from 'react';
import { DashLg, PlusLg, Trash3 } from 'react-bootstrap-icons';
import { Produtos } from 'types';
import { precoFormatadoParaReal } from 'utils';
import {
    BotaoQuantidades,
    BotaoExcluir,
    Quantidade,
    Preco,
    Produto,
    Titulo,
} from './style';
import { useAppDispatch } from 'hooks';
import {
    adicionarQuantidade,
    removerProduto,
    removerQuantidade,
} from 'store/modules/carrinho';
import Placeholder from 'assets/placeholder.svg';

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
        quantity: 1,
    };

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
                        <Preco>{subTotal}</Preco>

                        <div className='d-flex align-items-center'>
                            <BotaoQuantidades
                                variant='outline-light'
                                size='sm'
                                onClick={() =>
                                    dispatch(removerQuantidade(produto))
                                }
                                disabled={quantity === 1}
                            >
                                <DashLg className='bi' />
                                <span className='visually-hidden'>
                                    Retirar um {product.title}
                                </span>
                            </BotaoQuantidades>

                            <Quantidade className='user-select-none'>
                                {quantity}
                                <span className='visually-hidden'>
                                    produtos no carrinho
                                </span>
                            </Quantidade>

                            <BotaoQuantidades
                                variant='outline-light'
                                size='sm'
                                onClick={() =>
                                    dispatch(adicionarQuantidade(produto))
                                }
                            >
                                <PlusLg className='bi' />
                                <span className='visually-hidden'>
                                    Adicionar mais um {product.title}
                                </span>
                            </BotaoQuantidades>
                        </div>
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
