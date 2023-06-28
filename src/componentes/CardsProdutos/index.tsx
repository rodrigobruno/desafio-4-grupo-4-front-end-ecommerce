import { useEffect, useState } from 'react';
import { api } from 'lib/axios';
import { Produto, Feedback, ProdutosQuery } from 'types/';
import CardProduto from 'componentes/CardsProdutos/CardProduto';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import CarregandoPagina from 'componentes/CarregandoPagina';
import { Col, Row } from 'react-bootstrap';
import BotaoMais from 'componentes/BotaoMais';
import { useAppSelector } from 'hooks';

export default function CardsProdutos({
    pagina = 1,
    limite = 9,
    categoria,
}: ProdutosQuery) {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [feedback, setFeedback] = useState<Feedback>({
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        ocorreuErroNaRespostaApi: false,
    });
    const [estaCarregando, setEstaCarregando] = useState(true);

    const categoriaUrl = categoria ? categoria : '';

    useEffect(() => {
        const pegarProdutos = async () => {
            setEstaCarregando(true);
            setFeedback((prevState) => {
                return {
                    ...prevState,
                    ocorreuErroNaRespostaApi: false,
                };
            });

            const categoriaSelecionada = categoria
                ? `&category=${categoria}`
                : '';

            try {
                const resposta = await api.get(
                    `/products/?page=${pagina}&limit=${limite}${categoriaSelecionada}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    }
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
        pegarProdutos();
    }, [pagina, limite, categoria, accessToken]);

    return (
        <>
            {feedback.ocorreuErroNaRespostaApi && (
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            )}

            {!feedback.ocorreuErroNaRespostaApi &&
                feedback.totalItems === 0 && (
                    <p>Nenhum produto cadastrado na loja ainda.</p>
                )}

            {!feedback.ocorreuErroNaRespostaApi && feedback.totalItems > 0 && (
                <Row xs={1} sm={2} md={3} lg={3} xl={3} xxl={3} className='g-4'>
                    {produtos.map((produto) => (
                        <CardProduto
                            key={produto._id}
                            _id={produto._id}
                            title={produto.title}
                            price={produto.price}
                            img={produto.img}
                        />
                    ))}
                </Row>
            )}

            {!feedback.ocorreuErroNaRespostaApi && feedback.totalItems > 3 && (
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

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
