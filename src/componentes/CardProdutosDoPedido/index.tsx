import { LinkContainer } from 'react-router-bootstrap';
import { precoFormatadoParaReal } from 'utils';
import {
    Container,
    ThumbnailDoProduto,
    LinkProduto,
    InformacoesDoProduto,
} from './style';

interface Props {
    id: string;
    imagem: string;
    nome: string;
    quantidade: number;
    preco: number;
}

export default function CardProdutosDoPedido({
    id,
    imagem,
    nome,
    quantidade,
    preco,
}: Props) {
    const precoEmReais = precoFormatadoParaReal(preco);
    const total = precoFormatadoParaReal(quantidade * preco);

    return (
        <Container>
            <ThumbnailDoProduto src={imagem} alt={nome} className='rounded' />
            <InformacoesDoProduto>
                <h3 className='h4 mb-3 text-uppercase'>{nome}</h3>
                <p className='mb-0'>
                    {quantidade} x {precoEmReais}
                </p>
                <p className='mb-0'>Total {total}</p>
            </InformacoesDoProduto>
            <LinkContainer to={`/produto/${id}`}>
                <LinkProduto variant='secondary'>Ver produto</LinkProduto>
            </LinkContainer>
        </Container>
    );
}
