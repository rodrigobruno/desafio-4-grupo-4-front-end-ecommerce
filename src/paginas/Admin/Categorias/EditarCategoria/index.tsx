import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function AdminEditarCategoria() {
    const { id } = useParams();
    return (
        <>
            <Helmet>
                <title>
                    Editar categoria - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-0 mb-md-3 mb-lg-4 text-uppercase text-break'>
                        Editar categoria {id}
                    </h1>
                </Col>
            </Row>
        </>
    );
}
