import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from 'lib/axios';
import { PedidoProps } from 'types';
import NaoEncontrada from 'paginas/NaoEncontrada';
import { Col, Container, Row } from 'react-bootstrap';
import { CardText } from 'react-bootstrap-icons';
import Carregando from 'componentes/Carregando';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { dataFormatadaParaDDMMYY, precoFormatadoParaReal } from 'utils';

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
                const resposta = await api.get(`/orders/${id}`, {
                    headers: {
                        Prefer: 'code=200, example=200 - Pedido',
                        //Prefer: 'code=200, example=200 - Pedido vazio',
                        //Prefer: 'code=204',
                    },
                });
                if (
                    resposta.status === 204 ||
                    Object.keys(resposta.data).length === 0 ||
                    id === resposta.data.userId
                ) {
                    setApiResposta204(true);
                } else {
                    setPedido(resposta.data);
                }
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarPedidos();
    }, [id]);

    if (apiResposta204 || !pedido) {
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
                        <h1 className='mb-4 text-uppercase'>
                            <CardText className='bi me-2' />
                            Pedido {id}
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col className='mb-5'>
                        {estaCarregando && !ocorreuErroNaRespostaApi && (
                            <div className='w-100 d-flex justify-content-center'>
                                <Carregando
                                    largura={2}
                                    altura={2}
                                    cor='var(--cor-preta-1)'
                                />
                            </div>
                        )}
                        {ocorreuErroNaRespostaApi && (
                            <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
                        )}
                        {!ocorreuErroNaRespostaApi && (
                            <>
                                <div>{pedido.status}</div>
                                <div>
                                    {dataFormatadaParaDDMMYY(pedido.createdAt)}
                                </div>
                                <div>{pedido.address}</div>
                                <div>
                                    {precoFormatadoParaReal(pedido.amount)}
                                </div>
                                {pedido.products.map((produto) => {
                                    return (
                                        <>
                                            <div>{produto.title}</div>
                                            <div>{produto.quantity}</div>
                                            <div>
                                                <img
                                                    src={produto.img}
                                                    alt={produto.title}
                                                />
                                            </div>
                                            <div>
                                                {precoFormatadoParaReal(
                                                    produto.price
                                                )}
                                            </div>
                                        </>
                                    );
                                })}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}
