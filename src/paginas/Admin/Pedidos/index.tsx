import CardPedido from 'componentes/CardPedido';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { useAppSelector } from 'hooks';
import { api } from 'lib/axios';
import { useEffect, useState } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { CardPedidosProps, Feedback } from 'types';

export default function AdminPedidos() {
    const accessToken =
        useAppSelector((state) => state.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [pedidos, setPedidos] = useState<CardPedidosProps[]>([]);
    const [feedback, setFeedback] = useState<Feedback>({
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        ocorreuErroNaRespostaApi: false,
    });
    const [estaCarregando, setEstaCarregando] = useState(true);

    useEffect(() => {
        const pegarPedidos = async () => {
            setEstaCarregando(true);
            setFeedback((prevState) => {
                return {
                    ...prevState,
                    ocorreuErroNaRespostaApi: false,
                };
            });

            try {
                const resposta = await api.get(`/orders/?page=1&limit=9`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });
                setPedidos(resposta.data.orders);
                setFeedback({
                    currentPage: resposta.data.currentPage,
                    totalItems: resposta.data.totalItems,
                    totalPages: resposta.data.totalPages,
                    ocorreuErroNaRespostaApi: false,
                });
            } catch (error) {
                setFeedback((prevState) => {
                    return {
                        ...prevState,
                        ocorreuErroNaRespostaApi: true,
                    };
                });
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarPedidos();
    }, [accessToken]);

    return (
        <>
            <Helmet>
                <title>Pedidos - Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>Pedidos</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    {feedback.ocorreuErroNaRespostaApi && (
                        <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
                    )}

                    {!feedback.ocorreuErroNaRespostaApi &&
                        (pedidos === null || pedidos.length === 0) && (
                            <p>Nenhum pedido realizado na loja.</p>
                        )}

                    {!feedback.ocorreuErroNaRespostaApi && pedidos !== null && (
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

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
