import { Button } from 'react-bootstrap';
import { CardText } from 'react-bootstrap-icons';
import { Container } from './style';
import { precoFormatadoParaReal, dataFormatadaParaDDMMYY } from 'utils';
import PedidoInformacao from './PedidoInformacao';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

interface Props {
    id: string;
    numero: string;
    data: string;
    total: number;
    status: string;
}

export default function CardPedido({ id, numero, data, total, status }: Props) {
    const location = useLocation();
    const ehAdminPath = location.pathname.includes('/admin/', 0)
        ? '/admin'
        : '';
    const totalEmReais = precoFormatadoParaReal(total);
    const dataFormatada = dataFormatadaParaDDMMYY(data);

    return (
        <Container>
            <PedidoInformacao titulo='Número' descricao={numero} />
            <PedidoInformacao titulo='Data' descricao={dataFormatada} />
            <PedidoInformacao titulo='Total' descricao={totalEmReais} />
            <PedidoInformacao titulo='Status' descricao={status} />
            <div className='card-pedido__detalhes'>
                <LinkContainer to={`${ehAdminPath}/pedidos/${id}`}>
                    <Button as='a'>
                        <CardText className='bi me-2' />
                        Detalhes do pedido
                    </Button>
                </LinkContainer>
            </div>
        </Container>
    );
}
