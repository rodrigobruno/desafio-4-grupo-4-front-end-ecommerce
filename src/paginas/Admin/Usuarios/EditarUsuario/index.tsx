import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { api } from 'lib/axios';
import {Usuario} from 'types';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import CarregandoPagina from 'componentes/CarregandoPagina';
import NaoEncontrada from 'paginas/NaoEncontrada';
import FormularioUsuario from 'componentes/Admin/FormularioUsuario';

export default function AdminEditarUsuario() {
    const { id } = useParams();
    const [usuario, setUsuarios] = useState<Usuario>();
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [apiResposta204, setApiResposta204] = useState(false);

    useEffect(() => {
        const pegarUsuario = async () => {
            setEstaCarregando(true);
            setApiResposta204(false);
            setOcorreuErroNaRespostaApi(false);

            try {
                const resposta = await api.get(`/users/${id}`);
                if (resposta.status === 200) {
                    setUsuarios(resposta.data);
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
        pegarUsuario();
    }, [id]);

    if (ocorreuErroNaRespostaApi) {
        return (
            <>
                <CarregandoPagina visibilidade={estaCarregando} />
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            </>
        );
    }

    if (apiResposta204 || !usuario || Object.keys(usuario).length === 0) {
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
                    Editar usuário - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-0 mb-md-3 mb-lg-4 text-uppercase text-break'>
                        Editar usuário {id}
                    </h1>
                </Col>
            </Row>

            <FormularioUsuario
                tipo='put'
                id={usuario._id.toString()}
                nome={usuario.nameid}
                usuario={usuario.username}
                email={usuario.emails}
                admin={usuario.isAdmin}
                labelDoBotao='Atualizar usuário'
            />
        </>
    );
}

