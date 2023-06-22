import { Helmet } from 'react-helmet-async';
import { Col, Row, Stack } from 'react-bootstrap';
import CardProdutoAdmin from 'componentes/Admin/CardProduto';
import { useEffect, useState } from 'react';
import { api } from 'lib/axios';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { Link } from 'react-router-dom';
import { Feedback, Produto, ProdutosQuery } from 'types';

export default function AdminProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [feedback, setFeedback] = useState<Feedback>({
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        ocorreuErroNaRespostaApi: false,
    });
    const [query, setQuery] = useState<ProdutosQuery>({
        pagina: 1,
        limite: 9,
    });
    const [estaCarregando, setEstaCarregando] = useState(true);

    const pegarProdutos = async () => {
        setEstaCarregando(true);
        setFeedback((prevState) => {
            return {
                ...prevState,
                ocorreuErroNaRespostaApi: false,
            };
        });

        const categoriaSelecionada = query.categoria
            ? `&category=${query.categoria}`
            : '';

        try {
            const resposta = await api.get(
                `/products/?page=${query.pagina}&limit=${query.limite}${categoriaSelecionada}`
            );
            setProdutos(resposta.data.products);
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

    useEffect(() => {
        pegarProdutos();
    }, []);
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

            {feedback.ocorreuErroNaRespostaApi && (
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            )}

            {!feedback.ocorreuErroNaRespostaApi &&
                feedback.totalItems === 0 && (
                    <p>Nenhum produto cadastrado na loja ainda.</p>
                )}

            {!feedback.ocorreuErroNaRespostaApi && (
                <Row>
                    <Col>
                        <Stack gap={4}>
                            {produtos.length > 0 &&
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
                            {produtos.length === 0 && (
                                <p>
                                    Nenhum produto cadastrado.{' '}
                                    <Link to='/admin/produtos/criar'>
                                        Criar novo produto
                                    </Link>
                                </p>
                            )}
                        </Stack>
                    </Col>
                </Row>
            )}

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
