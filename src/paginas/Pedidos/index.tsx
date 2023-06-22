import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Box2Heart } from 'react-bootstrap-icons';
import { useAppSelector } from 'hooks';
import { api } from 'lib/axios';
import { CardPedidosProps } from 'types';
import CardPedido from 'componentes/CardPedido';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import CarregandoPagina from 'componentes/CarregandoPagina';
import { Link } from 'react-router-dom';

export default function Pedidos() {
    const nome = useAppSelector((state) => state.nameid) || '';
    const id =
        useAppSelector((state) => state._id) ||
        localStorage.getItem('@autenticacao-react:userId');
    const accessToken =
        useAppSelector((state) => state.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');

    const [pedidos, setPedidos] = useState<CardPedidosProps[]>([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);

    useEffect(() => {
        const pegarPedidos = async () => {
            setOcorreuErroNaRespostaApi(false);
            setEstaCarregando(true);

            try {
                const resposta = await api.get(`/orders/user/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });
                setPedidos(resposta.data);
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarPedidos();
    }, [id, accessToken]);

    return (
        <>
            <Helmet>
                <title>Gama Zone - Seus pedidos</title>
                <meta
                    name='description'
                    content='Acompanhe seus pedidos de board games na nossa loja. Entrega rápida, rastreamento online e suporte dedicado para garantir sua satisfação.'
                />
            </Helmet>

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-0 mb-md-3 mb-lg-4  text-uppercase'>
                            Olá, {nome}!
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className='mt-5 mb-4 text-uppercase'>
                            <Box2Heart className='bi me-2' />
                            Seus pedidos
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-5'>
                        {ocorreuErroNaRespostaApi && (
                            <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
                        )}

                        {!ocorreuErroNaRespostaApi &&
                            (pedidos === null || pedidos.length === 0) && (
                                <p>
                                    Nenhum pedido realizado.{' '}
                                    <Link to='/produtos'>
                                        Veja nosso produtos
                                    </Link>
                                </p>
                            )}

                        {!ocorreuErroNaRespostaApi && pedidos !== null && (
                            <Stack gap={4}>
                                {pedidos.map((produto) => (
                                    <CardPedido
                                        key={produto._id}
                                        id={produto._id}
                                        numero={produto._id}
                                        data={produto.createdAt}
                                        total={produto.amount}
                                        status={produto.status}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Col>
                </Row>
            </Container>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
