import { Container } from './style';
import PedidoDados from './PedidoDados';
import { Endereco } from 'types';
import { House } from 'react-bootstrap-icons';

export default function CardEnderecoDoPedido({
    cep = '',
    rua = '',
    numero = '',
    complemento = '',
    bairro = '',
    cidade = '',
    estado = '',
}: Endereco) {
    const lougradoro = `${rua}, ${numero} ${complemento}`;
    const bairroCidadeEstado = `${bairro}, ${cidade} - ${estado}`;

    return (
        <>
            <Container>
                <h2 className='mb-3 text-uppercase'>
                    <House className='bi me-2' />
                    Endereço
                </h2>
                <PedidoDados descricao={lougradoro} />
                <PedidoDados descricao={bairroCidadeEstado} />
                <PedidoDados descricao={cep} />
            </Container>
        </>
    );
}
