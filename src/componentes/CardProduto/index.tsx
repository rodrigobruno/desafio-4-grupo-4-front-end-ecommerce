import { Card } from 'react-bootstrap';
import { CardProdutoProps } from 'types';
import { precoFormatadoParaReal } from 'utils';
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

    return (
        <div className='col'>
            <CardContainer className='text-center'>
                <CardImagem variant='top' src={img} />
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
