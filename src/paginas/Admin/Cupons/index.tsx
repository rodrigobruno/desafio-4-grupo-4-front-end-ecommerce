import { Helmet } from 'react-helmet-async';
import { Row, Col } from 'react-bootstrap';

export default function AdminCupons() {
    return (
        <>
            <Helmet>
                <title>Cupons - Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>Cupons</h1>
                </Col>
            </Row>

            <Row>
                <Col>Em construção</Col>
            </Row>
        </>
    );
}
