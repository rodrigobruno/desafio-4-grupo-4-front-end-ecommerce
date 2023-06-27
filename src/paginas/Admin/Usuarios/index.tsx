import { Helmet } from 'react-helmet-async';
import { Col, Row, Stack } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { api } from 'lib/axios';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { Link } from 'react-router-dom';
import { Usuario } from 'types';
import CardUsuarioAdmin from 'componentes/Admin/CardUsuario';
import Paginacao from 'componentes/Paginacao';
import { useAppSelector } from 'hooks';

export default function AdminUsuarios() {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [paginasTotais, setPaginasTotais] = useState(0);
    const [itensTotais, setItensTotais] = useState(0);
    const [limite] = useState(10);

    const lidarComAPaginaAtual = (pagina: number) => {
        setPaginaAtual(pagina);
    };

    const pegarUsuario = useCallback(async () => {
        setEstaCarregando(true);
        setOcorreuErroNaRespostaApi(false);
        setOcorreuErroNaRespostaApi(false);

        try {
            const resposta = await api.get(
                `/users/?page=${paginaAtual}&limit=${limite}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            );
            setUsuarios(resposta.data.users);
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
    }, [accessToken, limite, paginaAtual]);

    useEffect(() => {
        pegarUsuario();
    }, [pegarUsuario]);

    return (
        <>
            <Helmet>
                <title>Usuários - Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>
            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>
                        Usuários cadastrados
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Stack gap={4}>
                        {(ocorreuErroNaRespostaApi ||
                            !Array.isArray(usuarios)) && (
                            <ErroAtualizarPagina classes='w-100 d-flex' />
                        )}

                        {(usuarios === null || usuarios.length === 0) &&
                            !ocorreuErroNaRespostaApi && (
                                <p>
                                    Nenhum usuário cadastrado.{' '}
                                    <Link to='/admin/usuarios/criar'>
                                        Criar usuário.
                                    </Link>
                                </p>
                            )}

                        {Array.isArray(usuarios) &&
                            !ocorreuErroNaRespostaApi &&
                            usuarios.map((usuario) => (
                                <CardUsuarioAdmin
                                    key={usuario._id}
                                    id={usuario._id.toString()}
                                    nome={usuario.nameid}
                                    usuario={usuario.username}
                                    email={usuario.emails}
                                    admin={usuario.isAdmin}
                                    pegarUsuario={pegarUsuario}
                                />
                            ))}
                    </Stack>
                </Col>
            </Row>

            {Array.isArray(usuarios) && !ocorreuErroNaRespostaApi && (
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
