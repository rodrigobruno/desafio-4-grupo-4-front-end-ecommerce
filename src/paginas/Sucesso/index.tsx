import PedidoInformacoes from 'componentes/Pedido';
import NaoEncontrada from 'paginas/NaoEncontrada';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function Sucesso() {
    const { id } = useParams();

    if (!id) {
        return <NaoEncontrada />;
    }

    return (
        <>
            <Helmet>
                <title>Pedido realizado - Gama Zone</title>
                <meta
                    name='description'
                    content='Parabéns pelo seu pedido! Aproveite a emoção dos jogos de tabuleiro com entrega rápida e suporte excepcional. Sua diversão está a caminho!'
                />
            </Helmet>

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-4 text-uppercase text-break'>
                            Pedido realizado com sucesso
                        </h1>
                    </Col>
                </Row>
            </Container>

            <PedidoInformacoes pedidoId={id} />
        </>
    );
}
