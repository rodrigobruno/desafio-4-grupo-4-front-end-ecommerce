import { Container, ContainerDados } from './style';
import { precoFormatadoParaReal, dataFormatadaParaDDMMYY } from 'utils';
import PedidoDados from './PedidoDados';
import { CardText } from 'react-bootstrap-icons';

interface Props {
    status: string;
    data: string;
    total: number;
}

export default function CardDadosDoPedido({
    status = '',
    data = '',
    total = 0,
}: Props) {
    const totalEmReais = precoFormatadoParaReal(total);
    const dataFormatada = dataFormatadaParaDDMMYY(data);

    return (
        <Container>
            <h2 className='mb-3 text-uppercase'>
                <CardText className='bi me-2' />
                Dados
            </h2>
            <ContainerDados>
                <PedidoDados titulo='Status' descricao={status} />
                <PedidoDados titulo='Data' descricao={dataFormatada} />
                <PedidoDados titulo='Total' descricao={totalEmReais} />
            </ContainerDados>
        </Container>
    );
}
