import { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Form, Alert, Col, Container, Row } from 'react-bootstrap';
import {
    CheckCircleFill,
    PencilSquare,
    PersonCircle,
} from 'react-bootstrap-icons';

import { api } from 'lib/axios';
import { AxiosError } from 'axios';

import { useAppSelector } from 'hooks';

import { BgForm, ButtonBlock } from './style';
import Carregando from 'componentes/Carregando';
import CarregandoPagina from 'componentes/CarregandoPagina';

export interface CamposFormUsuario {
    nameid: string;
    username: string;
    emails: string;
    password?: string;
}

export interface ErrosFormUsuario {
    nameid: string | null;
    username: string | null;
    emails: string | null;
    password?: string | null;
}

export default function Profile() {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [estaCarregando, setEstaCarregando] = useState(true);

    const id = useAppSelector((state) => state.authSlice._id);
    const nome = useAppSelector((state) => state.authSlice.nameid);
    const username = useAppSelector((state) => state.authSlice.username);
    const emails = useAppSelector((state) => state.authSlice.emails);

    const [form, setForm] = useState<CamposFormUsuario>({
        nameid: nome || '',
        username: username || '',
        emails: emails || '',
    });

    const [erros, setErros] = useState<ErrosFormUsuario>({
        nameid: null,
        username: null,
        emails: null,
    });

    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarAlertaErro500, setMostrarAlertaErro500] = useState(false);
    const [mostrarAlertaSucesso200, setMostrarAlertaSucesso200] =
        useState(false);

    useEffect(() => {
        setForm({
            nameid: nome || '',
            username: username || '',
            emails: emails || '',
        });
        setEstaCarregando(false);
    }, [nome, username, emails]);

    const lidarComAsMudancasNosCampos = (
        campo: keyof ErrosFormUsuario,
        valor: string
    ) => {
        setForm({
            ...form,
            [campo]: valor,
        });

        if (!!erros[campo]) {
            setErros({
                ...erros,
                [campo]: null,
            });
        }
    };

    const validarForm = () => {
        const { username, nameid, emails }: CamposFormUsuario = form;
        const novoErros = {} as CamposFormUsuario;

        const ehEmail = (email: string) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emails);

        if (!username || username === '') {
            novoErros.username = 'Preencha o nome de usuário';
        } else if (username.length < 3) {
            novoErros.username = 'O nome deve ter mais do que 3 caracteres';
        }

        if (!nameid || nameid === '') {
            novoErros.nameid = 'Preencha o nome completo';
        } else if (nameid.length < 3) {
            novoErros.nameid = 'O nome deve ter mais do que 3 caracteres';
        }

        if (!emails || emails === '') {
            novoErros.emails = 'Preencha o e-mail';
        } else if (!ehEmail(emails)) {
            novoErros.emails = 'E-mail inválido';
        }

        return novoErros;
    };

    const lidarComEnvio = async (e: FormEvent) => {
        e.preventDefault();

        setMostrarAlertaErro500(false);
        setMostrarAlertaSucesso200(false);
        setEnviadandoDados(false);

        const errosNoFormulario = validarForm();

        if (Object.keys(errosNoFormulario).length > 0) {
            setErros(errosNoFormulario);
            window.scrollTo(0, 0);
        } else {
            setEnviadandoDados(true);

            try {
                await api.put(
                    `/users/${id}`,
                    {
                        nameid: form.nameid,
                        username: form.username,
                        emails: form.emails,
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    }
                );

                window.scrollTo(0, 0);
                return setMostrarAlertaSucesso200(true);
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    window.scrollTo(0, 0);
                    if (err.response.status === 500)
                        return setMostrarAlertaErro500(true);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            } finally {
                setEnviadandoDados(false);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Entrar - Gama Zone</title>
                <meta
                    name='description'
                    content='Faça login na nossa loja de board games e tenha acesso a vantagens exclusivas, histórico de compras e uma experiência personalizada. Junte-se a nós agora!'
                />
            </Helmet>

            <CarregandoPagina visibilidade={estaCarregando} />

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-4 text-center text-uppercase'>
                            <PersonCircle className='bi me-2' />
                            Seus dados
                        </h1>
                    </Col>
                </Row>
                <Row className='mx-1 mx-sm-0 justify-content-center'>
                    <BgForm
                        xs='12'
                        sm='12'
                        md='8'
                        lg='8'
                        xl='7'
                        xxl='5'
                        className='mb-5 p-5 p-sm-5'
                    >
                        {mostrarAlertaErro500 && (
                            <Alert
                                key='alerta-erro-salvar-dados'
                                variant='warning'
                                className='mb-4'
                            >
                                Ocorreu um erro, tente novamente na próxima
                                rodada.
                            </Alert>
                        )}

                        {mostrarAlertaSucesso200 && (
                            <Alert
                                key='alerta-sucesso-salvar-dados'
                                variant='success'
                                className='mb-4'
                            >
                                <CheckCircleFill className='bi me-2' />
                                Informações salvas com sucesso.
                            </Alert>
                        )}

                        <Form noValidate onSubmit={lidarComEnvio}>
                            <Form.Group
                                className='mb-3'
                                controlId='formLoginUsername'
                            >
                                <Form.Label>Nome de usuário</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type='text'
                                    placeholder='Digite o seu nome de usuário'
                                    value={form.username}
                                    onChange={(e) =>
                                        lidarComAsMudancasNosCampos(
                                            'username',
                                            e.target.value
                                        )
                                    }
                                    isInvalid={!!erros.username}
                                    required
                                    disabled
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                className='mb-3'
                                controlId='formLoginNameid'
                            >
                                <Form.Label>Nome completo</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type='text'
                                    placeholder='Digite o seu nome completo'
                                    value={form.nameid}
                                    onChange={(e) =>
                                        lidarComAsMudancasNosCampos(
                                            'nameid',
                                            e.target.value
                                        )
                                    }
                                    isInvalid={!!erros.nameid}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.nameid}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                className='mb-3'
                                controlId='formLoginEmail'
                            >
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type='email'
                                    placeholder='Digite o seu email'
                                    value={form.emails}
                                    onChange={(e) =>
                                        lidarComAsMudancasNosCampos(
                                            'emails',
                                            e.target.value
                                        )
                                    }
                                    isInvalid={!!erros.emails}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.emails}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <ButtonBlock
                                variant='primary'
                                type='submit'
                                disabled={enviadandoDados}
                                size='lg'
                                className='d-flex align-items-center justify-content-center mt-4'
                            >
                                {enviadandoDados && (
                                    <Carregando
                                        largura={1.5}
                                        altura={1.5}
                                        cor='var(--cor-preta-5)'
                                        className='me-2'
                                    />
                                )}
                                Salvar
                            </ButtonBlock>
                        </Form>

                        <Link to='/senha'>
                            <Alert
                                key='alerta-alterar-senha'
                                className='mt-5 mb-0 text-center'
                            >
                                <PencilSquare className='bi me-2' />
                                Alterar sua senha
                            </Alert>
                        </Link>
                    </BgForm>
                </Row>
            </Container>
        </>
    );
}
