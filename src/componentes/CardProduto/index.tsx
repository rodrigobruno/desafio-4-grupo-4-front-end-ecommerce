import { Button, Card } from 'react-bootstrap';
import { CardProdutoProps } from 'types';
import { precoFormatadoParaReal } from 'utils';
import {
    CardContainer,
    CardImagem,
    CardTitulo,
    CardSubTitulo,
    CardFooter,
} from './style';

export default function CardProduto({ title, price, image }: CardProdutoProps) {
    const preco = precoFormatadoParaReal(price);

    return (
        <div className='col'>
            <CardContainer className='text-center'>
                <CardImagem variant='top' src={image} />
                <Card.Body>
                    <CardTitulo>{title}</CardTitulo>
                    <CardSubTitulo>{preco}</CardSubTitulo>
                </Card.Body>
                <CardFooter>
                    <Button variant='primary'>Comprar</Button>
                </CardFooter>
            </CardContainer>
        </div>
    );
}
