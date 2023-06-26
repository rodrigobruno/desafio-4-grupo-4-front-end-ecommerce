import { Helmet } from 'react-helmet-async';
import { Col, Row, Stack } from 'react-bootstrap';
import CardProdutoAdmin from 'componentes/Admin/CardProduto';
import { useCallback, useEffect, useState } from 'react';
import { api } from 'lib/axios';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { Link } from 'react-router-dom';
import { Produto } from 'types';
import Paginacao from 'componentes/Paginacao';

export default function AdminProdutos() {
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [paginasTotais, setPaginasTotais] = useState(0);
    const [itensTotais, setItensTotais] = useState(0);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [limite] = useState(10);
    const [categoria] = useState();

    const lidarComAPaginaAtual = (pagina: number) => {
        setPaginaAtual(pagina);
    };

    const pegarProdutos = useCallback(async () => {
        setEstaCarregando(true);
        setOcorreuErroNaRespostaApi(false);

        const categoriaSelecionada = categoria ? `&category=${categoria}` : '';

        try {
            const resposta = await api.get(
                `/products/?page=${paginaAtual}&limit=${limite}${categoriaSelecionada}`
            );
            setProdutos(resposta.data.products);
            setPaginaAtual(Number(resposta.data.currentPage));
            setItensTotais(Number(resposta.data.totalItems));
            setPaginasTotais(Number(resposta.data.totalPages));
            setOcorreuErroNaRespostaApi(false);
            window.scrollTo(0, 0);
        } catch (error) {
            window.scrollTo(0, 0);
            setOcorreuErroNaRespostaApi(true);
        } finally {
            setEstaCarregando(false);
        }
    }, [categoria, limite, paginaAtual]);

    useEffect(() => {
        pegarProdutos();
    }, [pegarProdutos]);

    return (
        <>
            <Helmet>
                <title>Produtos - Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>
                        Produtos cadastrados
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Stack gap={4}>
                        {(ocorreuErroNaRespostaApi ||
                            !Array.isArray(produtos)) && (
                            <ErroAtualizarPagina classes='w-100 d-flex' />
                        )}

                        {(produtos === null || produtos.length === 0) &&
                            !ocorreuErroNaRespostaApi && (
                                <p>
                                    Nenhum produto cadastrado.{' '}
                                    <Link to='/admin/produtos/criar'>
                                        Criar novo produto
                                    </Link>
                                </p>
                            )}

                        {Array.isArray(produtos) &&
                            !ocorreuErroNaRespostaApi &&
                            produtos.map((produto) => (
                                <CardProdutoAdmin
                                    key={produto._id}
                                    numero={produto._id}
                                    imagem={produto.img}
                                    nome={produto.title}
                                    preco={produto.price}
                                    pegarProdutos={pegarProdutos}
                                />
                            ))}
                    </Stack>
                </Col>
            </Row>

            {Array.isArray(produtos) && !ocorreuErroNaRespostaApi && (
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
            )}

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
