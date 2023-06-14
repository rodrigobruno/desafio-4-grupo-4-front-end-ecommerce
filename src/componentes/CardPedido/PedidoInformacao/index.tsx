import { Container } from './style';

interface Props {
    titulo: string;
    descricao: string | number;
}

export default function PedidoInformacao({ titulo, descricao }: Props) {
    return (
        <Container>
            <p className='card-pedido__titulo'>{titulo}</p>
            <h3 className='h4 card-pedido__informacao'>{descricao}</h3>
        </Container>
    );
}
