import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { api } from 'lib/axios';
import { Produto } from 'types';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import FormularioProduto from 'componentes/Admin/FormularioProduto';
import CarregandoPagina from 'componentes/CarregandoPagina';
import NaoEncontrada from 'paginas/NaoEncontrada';
import { useAppSelector } from 'hooks';

export default function AdminEditarProduto() {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const { id } = useParams();
    const [produto, setProduto] = useState<Produto>();
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [apiResposta204, setApiResposta204] = useState(false);

    useEffect(() => {
        const pegarProduto = async () => {
            setEstaCarregando(true);
            setApiResposta204(false);
            setOcorreuErroNaRespostaApi(false);

            try {
                const resposta = await api.get(`/products/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });
                if (resposta.status === 200) {
                    setProduto(resposta.data);
                }

                if (resposta.status === 204) {
                    setApiResposta204(true);
                }
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarProduto();
    }, [accessToken, id]);

    if (ocorreuErroNaRespostaApi) {
        return (
            <>
                <CarregandoPagina visibilidade={estaCarregando} />
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            </>
        );
    }

    if (apiResposta204 || !produto || Object.keys(produto).length === 0) {
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
                <title>
                    Editar produto - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-0 mb-md-3 mb-lg-4 text-uppercase text-break'>
                        Editar produto {id}
                    </h1>
                </Col>
            </Row>

            <FormularioProduto
                tipo='put'
                id={produto._id}
                nome={produto.title}
                preco={produto.price.toString()}
                imagem={produto.img}
                descricao={produto.desc}
                categoriasProp={produto.categories}
                labelDoBotao='Atualizar produto'
            />
        </>
    );
}
