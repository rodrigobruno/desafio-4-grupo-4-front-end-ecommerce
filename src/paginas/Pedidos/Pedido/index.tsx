import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from 'lib/axios';
import { PedidoProps } from 'types';
import { Col, Container, Row } from 'react-bootstrap';
import { Box2Heart, CardText } from 'react-bootstrap-icons';
import NaoEncontrada from 'paginas/NaoEncontrada';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import CarregandoPagina from 'componentes/CarregandoPagina';
import CardDadosDoPedido from 'componentes/CardDadosDoPedido';
import CardProdutosDoPedido from 'componentes/CardProdutosDoPedido';

export default function Pedido() {
    const { id } = useParams();
    const [pedido, setPedido] = useState<PedidoProps>();
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [apiResposta204, setApiResposta204] = useState(false);

    useEffect(() => {
        const pegarPedidos = async () => {
            try {
                const resposta = await api.get(`/orders/user/${id}`, {
                    headers: {
                        Prefer: 'code=200, example=200 - Pedido',
                        //Prefer: 'code=200, example=200 - Pedido vazio',
                        //Prefer: 'code=204',
                    },
                });

                if (resposta.status === 200) {
                    setPedido(resposta.data);
                }

                if (resposta.status === 204) {
                    setApiResposta204(true);
                }
            } catch (error) {
                console.log(ocorreuErroNaRespostaApi);

                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarPedidos();
    }, [id, ocorreuErroNaRespostaApi]);

    if (ocorreuErroNaRespostaApi) {
        return (
            <>
                <CarregandoPagina visibilidade={estaCarregando} />
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            </>
        );
    }

    if (apiResposta204 || !pedido || Object.keys(pedido).length === 0) {
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
                    content='Acompanhe seu pedido de board game na nossa loja. Entrega rápida, status atualizado e suporte dedicado para garantir sua satisfação.'
                />
            </Helmet>

            <CarregandoPagina visibilidade={estaCarregando} />

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-4 text-uppercase text-break'>
                            Pedido {pedido?._id}
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
                            endereco={pedido.address}
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
                <Row className='row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-3'>
                    {pedido.products.map((produto) => {
                        return (
                            <Col className='mb-4' key={produto._id}>
                                <CardProdutosDoPedido
                                    id={produto._id}
                                    imagem={produto.img}
                                    nome={produto.title}
                                    quantidade={produto.quantity}
                                    preco={produto.price}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}
