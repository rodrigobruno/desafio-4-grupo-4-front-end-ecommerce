import { Helmet } from 'react-helmet-async';
import { Col, Row } from 'react-bootstrap';
import FormularioProduto from 'componentes/Admin/FormularioProduto';

export default function AdminCriarProduto() {
    return (
        <>
            <Helmet>
                <title>
                    Criar produto - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>Criar produto</h1>
                </Col>
            </Row>

            <FormularioProduto
                tipo='post'
                categoriasProp={[]}
                labelDoBotao='Criar produto'
            />
        </>
    );
}
