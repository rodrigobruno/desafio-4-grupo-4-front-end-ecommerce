import { Container } from './style';
import { precoFormatadoParaReal, dataFormatadaParaDDMMYY } from 'utils';
import PedidoDados from './PedidoDados';

interface Props {
    status: string;
    data: string;
    total: number;
    rua: string;
    numero: string;
}

export default function CardDadosDoPedido({
    status,
    data,
    rua,
    numero,
    total,
}: Props) {
    const totalEmReais = precoFormatadoParaReal(total);
    const dataFormatada = dataFormatadaParaDDMMYY(data);
    const endereco = `${rua}, ${numero}`;

    return (
        <Container>
            <PedidoDados titulo='Status' descricao={status} />
            <PedidoDados titulo='Data' descricao={dataFormatada} />
            <PedidoDados titulo='Endereço' descricao={endereco} />
            <PedidoDados titulo='Total' descricao={totalEmReais} />
        </Container>
    );
}
