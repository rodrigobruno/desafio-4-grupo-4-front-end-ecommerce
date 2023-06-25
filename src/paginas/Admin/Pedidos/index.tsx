import CardPedidoAdmin from 'componentes/Admin/CardPedido';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import Paginacao from 'componentes/Paginacao';
import { useAppSelector } from 'hooks';
import { api } from 'lib/axios';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { CardPedidosProps } from 'types';

export default function AdminPedidos() {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [pedidos, setPedidos] = useState<CardPedidosProps[]>([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [paginasTotais, setPaginasTotais] = useState(0);
    const [itensTotais, setItensTotais] = useState(0);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [limite] = useState(10);

    const lidarComAPaginaAtual = (pagina: number) => {
        setPaginaAtual(pagina);
    };

    const pegarPedidos = useCallback(async () => {
        setEstaCarregando(true);
        setOcorreuErroNaRespostaApi(false);

        try {
            const resposta = await api.get(
                `/orders/?page=${paginaAtual}&limit=${limite}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            );
            setPedidos(resposta.data.orders);
            setPaginaAtual(Number(resposta.data.currentPage));
            setPaginasTotais(Number(resposta.data.totalItems));
            setItensTotais(Number(resposta.data.totalPages));
            setOcorreuErroNaRespostaApi(false);
        } catch (error) {
            setOcorreuErroNaRespostaApi(true);
        } finally {
            setEstaCarregando(false);
        }
    }, [accessToken, limite, paginaAtual]);

    useEffect(() => {
        pegarPedidos();
    }, [pegarPedidos]);

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
                    {ocorreuErroNaRespostaApi && (
                        <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
                    )}

                    {!ocorreuErroNaRespostaApi &&
                        (pedidos === null || pedidos.length === 0) && (
                            <p>Nenhum pedido realizado na loja.</p>
                        )}

                    {!ocorreuErroNaRespostaApi && pedidos !== null && (
                        <Stack gap={4}>
                            {pedidos.map((produto) => (
                                <CardPedidoAdmin
                                    key={produto._id}
                                    id={produto._id}
                                    numero={produto._id}
                                    data={produto.createdAt}
                                    total={produto.amount}
                                    status={produto.status}
                                    pegarPedidos={pegarPedidos}
                                />
                            ))}
                        </Stack>
                    )}
                </Col>
            </Row>

            <Row>
                <Col>
                    <Paginacao
                        paginaAtual={paginaAtual}
                        paginasTotais={paginasTotais}
                        itensTotais={itensTotais}
                        limite={limite}
                        mudarDePagina={lidarComAPaginaAtual}
                    />
                </Col>
            </Row>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
