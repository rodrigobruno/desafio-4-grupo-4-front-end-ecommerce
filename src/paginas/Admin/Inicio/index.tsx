import { Helmet } from 'react-helmet-async';
import { Row, Col } from 'react-bootstrap';
import { useAppSelector } from 'hooks';

export default function AdminInicio() {
    const nome = useAppSelector((state) => state.nameid) || '';

    return (
        <>
            <Helmet>
                <title>Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>Bem vindo {nome}</h1>
                </Col>
            </Row>

            <Row className='h-100'>
                <Col>Pedidos</Col>
                <Col>Produtos</Col>
                <Col>Usuários</Col>
                <Col>Categorias</Col>
                <Col>Cupons</Col>
            </Row>
        </>
    );
}
