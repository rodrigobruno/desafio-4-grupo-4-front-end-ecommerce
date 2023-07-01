import { AxiosError } from 'axios';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { useAppDispatch } from 'hooks';
import { api } from 'lib/axios';
import NaoEncontrada from 'paginas/NaoEncontrada';
import { useEffect, useState } from 'react';
import { Badge, Col, Row, Stack } from 'react-bootstrap';
import { Box2Heart } from 'react-bootstrap-icons';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { adicionarProduto } from 'store/modules/carrinho';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { precoFormatadoParaReal } from 'utils';
import AdicionarRemoverQuatidade from 'componentes/Quantidade';
import BotaoXl from 'componentes/BotaoXl';
import Imagem from 'componentes/Imagem';
import {
    Descricao,
    ImagemContainer,
    InformcoesDoProduto,
    PageContainer,
    Preco,
    ProdutoContainer,
    StickyTop,
    Titulo,
} from './style';
import RecomendacoesProdutos from 'componentes/RecomendacoesProdutos';

interface Produtos {
    product: {
        _id: string;
        title: string;
        desc: string;
        img: string;
        categories: [{ _id: string; title: string }];
        price: number;
    };
    quantity: number;
}

export default function PaginaDeProduto() {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const produtoValorInicial: Produtos = {
        product: {
            _id: '',
            title: '',
            desc: '',
            img: '',
            categories: [
                {
                    _id: '',
                    title: '',
                },
            ],
            price: 0,
        },
        quantity: 1,
    };

    const [produto, setProduto] = useState<Produtos>(produtoValorInicial);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [mostrarAlertaErro500, setMostrarAlertaErro500] = useState(false);
    const [mostrarAlertaErro404, setMostrarAlertaErro404] = useState(false);

    const lidarComAdicionarProduto = () => {
        dispatch(adicionarProduto(produto));

        toast.success('Produto adicionado a sua box!', {
            position: toast.POSITION.TOP_RIGHT,
            closeOnClick: false,
            closeButton: false,
            pauseOnHover: false,
            draggable: false,
            theme: 'colored',
            autoClose: 2000,
        });
    };

    useEffect(() => {
        const pegarProduto = async () => {
            setEstaCarregando(true);
            setMostrarAlertaErro500(false);
            setMostrarAlertaErro404(false);

            try {
                const resposta = await api.get(`/products/${id}`);
                setProduto((produto) => ({
                    ...produto,
                    product: resposta.data,
                }));
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    window.scrollTo(0, 0);
                    if (err.response.status === 500)
                        setMostrarAlertaErro500(true);
                    if (err.response.status === 404)
                        setMostrarAlertaErro404(true);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarProduto();
    }, [id]);

    if (!id || mostrarAlertaErro500) {
        return <NaoEncontrada />;
    }

    const preco = precoFormatadoParaReal(produto.product.price);
    const prmieiraCategoria = produto.product.categories[0]._id;

    const RenderHTML = (htmlPart: string) => {
        return <div dangerouslySetInnerHTML={{ __html: htmlPart }} />;
    };

    const lidarComAdicionarQuantidadeProduto = () => {
        setProduto((produto) => ({
            ...produto,
            quantity: produto.quantity + 1,
        }));
    };

    const lidarComRemoverQuantidadeProduto = () => {
        setProduto((produto) => ({
            ...produto,
            quantity: produto.quantity - 1,
        }));
    };

    const lidarComPlaceholder = (img = '') => {
        const url = img.split('.webp');
        const novaUrl = `${url[0]}-placeholder.webp`;
        return novaUrl;
    };

    return (
        <>
            <Helmet>
                <title>{produto.product.title} - Gama Zone</title>
                <meta
                    name='description'
                    content='Descubra o jogo de tabuleiro perfeito na nossa loja. Descrição detalhada, avaliações de clientes e entrega rápida. A diversão está a apenas um clique de distância!'
                />
            </Helmet>

            {mostrarAlertaErro404 && (
                <ErroAtualizarPagina classes='w-100 d-flex' />
            )}

            {!mostrarAlertaErro404 && (
                <PageContainer>
                    <ProdutoContainer>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={6} xl={7} xxl={7}>
                                <StickyTop>
                                    <ImagemContainer>
                                        <Imagem
                                            src={produto.product.img}
                                            placeholderSrc={lidarComPlaceholder(
                                                produto.product.img
                                            )}
                                            alt={produto.product.title}
                                            effect='opacity'
                                        />
                                    </ImagemContainer>
                                </StickyTop>
                            </Col>

                            <Col xs={12} sm={12} md={6} lg={6} xl={5} xxl={5}>
                                <StickyTop>
                                    <InformcoesDoProduto>
                                        <Titulo>{produto.product.title}</Titulo>

                                        <Stack gap={3}>
                                            <Stack
                                                gap={3}
                                                direction='horizontal'
                                            >
                                                <Preco>{preco}</Preco>

                                                <AdicionarRemoverQuatidade
                                                    nome={produto.product.title}
                                                    quntidade={produto.quantity}
                                                    adicionar={
                                                        lidarComAdicionarQuantidadeProduto
                                                    }
                                                    remover={
                                                        lidarComRemoverQuantidadeProduto
                                                    }
                                                />
                                            </Stack>

                                            <BotaoXl
                                                onClick={() =>
                                                    lidarComAdicionarProduto()
                                                }
                                            >
                                                <Box2Heart className='bi me-2' />
                                                Adicionar a caixinha
                                            </BotaoXl>
                                        </Stack>

                                        <Stack gap={3}>
                                            <Stack
                                                gap={3}
                                                direction='horizontal'
                                            >
                                                {produto.product.categories.map(
                                                    (categoria) => (
                                                        <Badge
                                                            pill
                                                            bg='light'
                                                            key={categoria._id}
                                                        >
                                                            {categoria.title}
                                                        </Badge>
                                                    )
                                                )}
                                            </Stack>

                                            <Descricao>
                                                {RenderHTML(
                                                    produto.product.desc || ''
                                                )}
                                            </Descricao>
                                        </Stack>
                                    </InformcoesDoProduto>
                                </StickyTop>
                            </Col>
                        </Row>
                    </ProdutoContainer>

                    <RecomendacoesProdutos categoria={prmieiraCategoria} />
                </PageContainer>
            )}

            <ToastContainer transition={Slide} />

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
