import { Helmet } from 'react-helmet-async';
import FormularioUsuario from 'componentes/Admin/FormularioUsuario';
import { Col, Row } from 'react-bootstrap';

export default function AdminCriarUsuario() {
    return (
        <>
            <Helmet>
                <title>
                    Criar usuário - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>Criar usuário</h1>
                </Col>
            </Row>

            <FormularioUsuario tipo='post' labelDoBotao='Criar usuário' />
        </>
    );
}
