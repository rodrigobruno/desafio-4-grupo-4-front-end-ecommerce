import { SyntheticEvent } from 'react';
import { Card } from 'react-bootstrap';
import { CardProdutoProps } from 'types';
import { precoFormatadoParaReal } from 'utils';
import Placeholder from 'assets/placeholder.svg';
import {
    CardContainer,
    CardImagem,
    CardTitulo,
    CardSubTitulo,
    CardButton,
    CardFooter,
} from './style';

export default function CardProduto({ title, price, img }: CardProdutoProps) {
    const preco = precoFormatadoParaReal(price);
    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        return ((e.target as HTMLImageElement).src = Placeholder);
    };

    return (
        <div className='col'>
            <CardContainer className='text-center'>
                <CardImagem variant='top' src={img} onError={onImageError} />
                <Card.Body>
                    <CardTitulo>{title}</CardTitulo>
                    <CardSubTitulo>{preco}</CardSubTitulo>
                </Card.Body>
                <CardFooter>
                    <CardButton variant='primary'>Comprar</CardButton>
                </CardFooter>
            </CardContainer>
        </div>
    );
}
