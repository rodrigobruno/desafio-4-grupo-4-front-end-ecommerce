import { useEffect, useState } from 'react';
import { api } from 'lib/axios';
import { Categorias, Produto, Produtos, ProdutosQuery } from 'types/';
import CardProduto from 'componentes/CardsProdutos/CardProduto';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import CarregandoPagina from 'componentes/CarregandoPagina';
import {
    Button,
    ButtonGroup,
    Col,
    Dropdown,
    DropdownButton,
    Row,
    Stack,
} from 'react-bootstrap';
import BotaoMais from 'componentes/BotaoMais';
import { useAppSelector } from 'hooks';
import Paginacao from 'componentes/Paginacao';
import { adicionarProduto } from 'store/modules/carrinho';
import { useAppDispatch } from 'hooks';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiltroTitulo, StickyTop } from './style';

export default function CardsProdutos({
    pagina = 1,
    limite = 9,
    categoria,
    verMais = true,
}: ProdutosQuery) {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const dispatch = useAppDispatch();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(pagina);
    const [limiteItens, setLimiteItens] = useState(limite);
    const [paginasTotais, setPaginasTotais] = useState(0);
    const [itensTotais, setItensTotais] = useState(0);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const categoriaUrl = categoria ? categoria : '';

    const [listaDeCategorias, setListaDeCategorias] = useState<Categorias[]>(
        []
    );
    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState('selecionar');
    const [filtrarCategoria, setFiltrarCategoria] = useState(categoriaUrl);

    const lidarComAPaginaAtual = (pagina: number) => {
        setPaginaAtual(pagina);
        setLimiteItens(9);
    };

    const lidarComMudancaFiltro = (id: string, nome: string) => {
        setFiltrarCategoria(id);
        setCategoriaSelecionada(nome);
        setPaginaAtual(1);
        setLimiteItens(9);
    };

    const limparFiltrarCategoria = () => {
        setFiltrarCategoria('');
        setPaginaAtual(1);
        setLimiteItens(9);
        setCategoriaSelecionada('selecionar');
    };

    const lidarComAdicionarProduto = (produto: Produtos, mostrar: boolean) => {
        dispatch(adicionarProduto(produto));
        toast.success('Produto adicionado a sua box!', {
            position: toast.POSITION.TOP_RIGHT,
            theme: 'colored',
            autoClose: 3000,
        });
    };

    useEffect(() => {
        const pegarProdutos = async () => {
            setEstaCarregando(true);
            setOcorreuErroNaRespostaApi(false);

            const categoriaSelecionada = filtrarCategoria
                ? `&category=${filtrarCategoria}`
                : '';
            console.log(categoriaSelecionada);

            try {
                const resposta = await api.get(
                    `/products/?page=${paginaAtual}&limit=${limiteItens}${categoriaSelecionada}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    }
                );
                setProdutos(resposta.data.products);
                setPaginaAtual(Number(resposta.data.currentPage));
                setItensTotais(Number(resposta.data.totalItems));
                setPaginasTotais(Number(resposta.data.totalPages));
                setOcorreuErroNaRespostaApi(false);
                window.scrollTo(0, 0);
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };

        const pegarCategorias = async () => {
            setEstaCarregando(true);
            setOcorreuErroNaRespostaApi(false);

            try {
                const resposta = await api.get(
                    `/categories/?page=1&limit=100`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    }
                );
                setListaDeCategorias(resposta.data.categories);
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarCategorias();
        pegarProdutos();
    }, [
        accessToken,
        categoria,
        filtrarCategoria,
        limite,
        limiteItens,
        paginaAtual,
    ]);

    return (
        <>
            {ocorreuErroNaRespostaApi && (
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            )}

            {!ocorreuErroNaRespostaApi && itensTotais === 0 && (
                <p>Nenhum produto cadastrado na loja ainda.</p>
            )}

            {!ocorreuErroNaRespostaApi && itensTotais > 0 && (
                <>
                    <StickyTop>
                        <Col>
                            <Stack gap={3} direction='horizontal'>
                                <FiltroTitulo>Filtrar por</FiltroTitulo>

                                <DropdownButton
                                    as={ButtonGroup}
                                    id='dropdown-filtro-categoria'
                                    variant='primary'
                                    size='sm'
                                    title={categoriaSelecionada}
                                >
                                    {listaDeCategorias.map((categoria) => (
                                        <Dropdown.Item
                                            key={categoria._id}
                                            eventKey={categoria._id}
                                            active={
                                                filtrarCategoria ===
                                                categoria._id
                                                    ? true
                                                    : false
                                            }
                                            onClick={(e) =>
                                                lidarComMudancaFiltro(
                                                    categoria._id,
                                                    categoria.title
                                                )
                                            }
                                        >
                                            {categoria.title}
                                        </Dropdown.Item>
                                    ))}
                                    {categoriaSelecionada !== 'selecionar' ? (
                                        <>
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                eventKey='limpar'
                                                disabled={estaCarregando}
                                                onClick={limparFiltrarCategoria}
                                            >
                                                Limpar
                                            </Dropdown.Item>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </DropdownButton>

                                {categoriaSelecionada !== 'selecionar' ? (
                                    <Button
                                        type='button'
                                        className='btn-close'
                                        aria-label='Close'
                                        disabled={estaCarregando}
                                        onClick={limparFiltrarCategoria}
                                    >
                                        <span className='visually-hidden'>
                                            Limpar categoria selecionada
                                        </span>
                                    </Button>
                                ) : (
                                    ''
                                )}
                            </Stack>
                        </Col>
                    </StickyTop>

                    <Row
                        xs={1}
                        sm={2}
                        md={3}
                        lg={3}
                        xl={3}
                        xxl={3}
                        className='g-4'
                    >
                        {produtos.map((produto) => (
                            <CardProduto
                                key={produto._id}
                                _id={produto._id}
                                title={produto.title}
                                price={produto.price}
                                img={produto.img}
                                lidarComAdicionarProduto={
                                    lidarComAdicionarProduto
                                }
                            />
                        ))}
                    </Row>
                </>
            )}

            {verMais && !ocorreuErroNaRespostaApi && itensTotais > 3 && (
                <Row>
                    <Col>
                        <BotaoMais
                            classes='d-flex justify-content-center my-5'
                            para={'/produtos/' + categoriaUrl}
                            variacao='secondary'
                            tamanho='lg'
                        />
                    </Col>
                </Row>
            )}

            {!verMais && !ocorreuErroNaRespostaApi && itensTotais > limite && (
                <Row>
                    <Col>
                        <Paginacao
                            paginaAtual={paginaAtual}
                            paginasTotais={paginasTotais}
                            itensTotais={itensTotais}
                            limite={limiteItens}
                            mudarDePagina={lidarComAPaginaAtual}
                        />
                    </Col>
                </Row>
            )}

            <ToastContainer />

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
