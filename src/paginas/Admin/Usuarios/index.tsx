import { Helmet } from 'react-helmet-async';
import { Col, Row, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { api } from 'lib/axios';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { Link } from 'react-router-dom';
import { Feedback,Usuario, UsuarioQuery } from 'types';
import CardUsuarioAdmin from 'componentes/Admin/CardUsuario';

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [feedback, setFeedback] = useState<Feedback>({
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        ocorreuErroNaRespostaApi: false,
    });
    const [query, setQuery] = useState<UsuarioQuery>({
        pagina: 1,
        limite: 20,
    });
    const [estaCarregando, setEstaCarregando] = useState(true);

    const pegarUsuario = async () => {
        setEstaCarregando(true);
        setFeedback((prevState) => {
            return {
                ...prevState,
                ocorreuErroNaRespostaApi: false,
            };
        });
        try {
            const resposta = await api.get(
                `/users/?page=${query.pagina}&limit=${query.limite}`
            );
            setUsuarios(resposta.data.users);
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
        pegarUsuario();
    }, []);

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
                        Produtos cadastrados
                    </h1>
                </Col>
            </Row>

            {feedback.ocorreuErroNaRespostaApi && (
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            )}

            {!feedback.ocorreuErroNaRespostaApi &&
                feedback.totalItems === 0 && (
                    <p>Nenhum usuário cadastrado.</p>
                )}

            {!feedback.ocorreuErroNaRespostaApi && (
                <Row>
                    <Col>
                        <Stack gap={4}>
                            {usuarios.length > 0 &&
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
                            {usuarios.length === 0 && (
                                <p>
                                    Nenhum usuário cadastrado.{' '}
                                    <Link to='/admin/usuarios/criarusuario'>
                                        Criar usuário.
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
