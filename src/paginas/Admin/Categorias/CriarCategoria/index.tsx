import FormularioCategoria from 'componentes/Admin/FormularioCategoria';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function AdminCriarCategoria() {
    return (
        <>
            <Helmet>
                <title>
                    Criar categoria - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>Criar categoria</h1>
                </Col>
            </Row>

            <FormularioCategoria tipo='post' labelDoBotao='Criar categoria' />
        </>
    );
}
