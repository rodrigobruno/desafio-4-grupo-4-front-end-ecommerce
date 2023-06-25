import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks';
import { useParams } from 'react-router-dom';
import { api } from 'lib/axios';
import { Col, Container, Row } from 'react-bootstrap';
import { Box2Heart, CardText } from 'react-bootstrap-icons';
import { PedidoProps } from 'types';
import NaoEncontrada from 'paginas/NaoEncontrada';
import CarregandoPagina from 'componentes/CarregandoPagina';
import CardDadosDoPedido from 'componentes/CardDadosDoPedido';
import CardProdutosDoPedido from 'componentes/CardProdutosDoPedido';

export default function AdminPedido() {
    const { id } = useParams();
    const [pedido, setPedido] = useState<PedidoProps>();
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');

    useEffect(() => {
        const pegarPedidos = async () => {
            setOcorreuErroNaRespostaApi(false);
            setEstaCarregando(true);

            try {
                const resposta = await api.get(`/orders/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });
                setPedido(resposta.data);
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarPedidos();
    }, [id, accessToken]);

    if (
        ocorreuErroNaRespostaApi ||
        !pedido ||
        Object.keys(pedido).length === 0
    ) {
        return (
            <>
                <CarregandoPagina visibilidade={estaCarregando} />
                <NaoEncontrada />
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Gama Zone - Seu pedido</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-4 text-uppercase'>
                            Pedido {pedido._id}
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2 className='mt-5 mb-3 text-uppercase'>
                            <CardText className='bi me-2' />
                            Dados do pedido
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CardDadosDoPedido
                            status={pedido.status}
                            data={pedido.createdAt}
                            rua={pedido.address.rua}
                            numero={pedido.address.numero}
                            total={pedido.amount}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className='mt-5 mb-3 text-uppercase'>
                            <Box2Heart className='bi me-2' />
                            Produtos adquiridos
                        </h2>
                    </Col>
                </Row>
                <Row xs={1} sm={1} md={2} lg={2} xl={3} xxl={3}>
                    {pedido.products.map((produto) => {
                        return (
                            <Col className='mb-4' key={produto._id}>
                                <CardProdutosDoPedido
                                    id={produto.product._id}
                                    imagem={produto.product.img || '#'}
                                    nome={produto.product.title || '-'}
                                    quantidade={produto.quantity || 0}
                                    preco={produto.product.price}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
