import { LinkContainer } from 'react-router-bootstrap';
import { lidarComPlaceholder, precoFormatadoParaReal } from 'utils';
import {
    Container,
    ThumbnailDoProduto,
    LinkProduto,
    InformacoesDoProduto,
} from './style';
import { SyntheticEvent } from 'react';
import Placeholder from 'assets/placeholder.svg';

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
    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        return ((e.target as HTMLImageElement).src = Placeholder);
    };

    return (
        <Container>
            <ThumbnailDoProduto
                src={imagem}
                alt={nome}
                onError={onImageError}
                className='rounded'
                placeholderSrc={lidarComPlaceholder(imagem)}
                effect='opacity'
            />
            <InformacoesDoProduto>
                <h3 className='h4 mb-3 text-uppercase'>{nome}</h3>
                <p className='mb-0'>
                    {quantidade} x {precoEmReais}
                </p>
                <p className='mb-0'>Total {total}</p>
            </InformacoesDoProduto>
            {id !== undefined && (
                <LinkContainer to={`/produto/${id}`}>
                    <LinkProduto variant='secondary'>Ver produto</LinkProduto>
                </LinkContainer>
            )}
        </Container>
    );
}
