import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import PedidoInformacoes from 'componentes/Pedido';
import NaoEncontrada from 'paginas/NaoEncontrada';

export default function Pedido() {
    const { id } = useParams();

    if (!id) {
        return <NaoEncontrada />;
    }

    return (
        <>
            <Helmet>
                <title>Gama Zone - Seu pedido</title>
                <meta
                    name='description'
                    content='Acompanhe seu pedido de board game na nossa loja. Entrega rápida, status atualizado e suporte dedicado para garantir sua satisfação.'
                />
            </Helmet>

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-4 text-uppercase text-break'>
                            Pedido {id}
                        </h1>
                    </Col>
                </Row>
            </Container>

            <PedidoInformacoes pedidoId={id} />
        </>
    );
}
