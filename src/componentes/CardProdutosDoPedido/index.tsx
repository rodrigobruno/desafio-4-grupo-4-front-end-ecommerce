import { Container, ThumbnailProduto } from './style';
import { precoFormatadoParaReal } from 'utils';

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
            <ThumbnailProduto src={imagem} alt={nome} className='rounded' />
            <div>
                <h3 className='mb-3'>{nome}</h3>
                <p className='mb-0'>
                    {quantidade} x {precoEmReais}
                </p>
                <p className='mb-0'>Total {total}</p>
            </div>
        </Container>
    );
}
