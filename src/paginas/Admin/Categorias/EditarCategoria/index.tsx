import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { api } from 'lib/axios';
import { Col, Row } from 'react-bootstrap';
import { Categorias } from 'types';
import NaoEncontrada from 'paginas/NaoEncontrada';
import FormularioCategoria from 'componentes/Admin/FormularioCategoria';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { useAppSelector } from 'hooks';

export default function AdminEditarCategoria() {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const { id } = useParams();
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [categoria, setCategoria] = useState<Categorias>();
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [apiResposta204, setApiResposta204] = useState(false);

    useEffect(() => {
        const pegarCategoria = async () => {
            setEstaCarregando(true);
            setApiResposta204(false);
            setOcorreuErroNaRespostaApi(false);

            try {
                const resposta = await api.get(`/categories/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });
                if (resposta.status === 200) {
                    setCategoria(resposta.data);
                }

                if (resposta.status === 204) {
                    setApiResposta204(true);
                }
            } catch (error) {
                window.scrollTo(0, 0);
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarCategoria();
    }, [accessToken, id]);

    if (ocorreuErroNaRespostaApi) {
        return (
            <>
                <CarregandoPagina visibilidade={estaCarregando} />
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            </>
        );
    }

    if (apiResposta204 || !categoria || Object.keys(categoria).length === 0) {
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
                    Editar categoria - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-0 mb-md-3 mb-lg-4 text-uppercase text-break'>
                        Editar categoria {id}
                    </h1>
                </Col>
            </Row>

            <FormularioCategoria
                tipo='put'
                id={categoria._id}
                nome={categoria.title}
                labelDoBotao='Atualizar categoria'
            />

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
