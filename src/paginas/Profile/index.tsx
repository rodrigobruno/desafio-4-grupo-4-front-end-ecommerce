import { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Form, Alert, Col, Container, Row } from 'react-bootstrap';

import { api } from 'lib/axios';
import { AxiosError } from 'axios';

import { useAppSelector } from 'hooks';
import { CamposFormUsuario, ErrosFormUsuario } from 'types';

import { BgForm, ButtonBlock } from './style';
import Carregando from 'componentes/Carregando';
import { CheckCircleFill } from 'react-bootstrap-icons';

export default function Profile() {
    const id = useAppSelector((state) => state._id);
    const nome = useAppSelector((state) => state.username);
    const email = useAppSelector((state) => state.email);

    const [form, setForm] = useState<CamposFormUsuario>({
        username: nome || '',
        email: email || '',
        password: '',
    });

    const [erros, setErros] = useState<ErrosFormUsuario>({
        username: null,
        email: null,
        password: null,
    });

    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarAlertaErro500, setMostrarAlertaErro500] = useState(false);
    const [mostrarAlertaSucesso200, setMostrarAlertaSucesso200] =
        useState(false);

    useEffect(() => {
        setForm({
            username: nome || '',
            email: email || '',
            password: '',
        });
    }, [nome, email]);

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
        const { username, email, password }: CamposFormUsuario = form;
        const novoErros = {} as CamposFormUsuario;

        const ehEmail = (email: string) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

        if (!username || username === '') {
            novoErros.username = 'Preencha o nome completo';
        } else if (username.length < 3) {
            novoErros.username = 'O nome deve ter mais do que 3 caracteres';
        }

        if (!email || email === '') {
            novoErros.email = 'Preencha o e-mail';
        } else if (!ehEmail(email)) {
            novoErros.email = 'E-mail inválido';
        }

        if (password && password.length < 6) {
            novoErros.password = 'A senha deve ter mais do que 6 caracteres';
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
                        username: form.username,
                        email: form.email,
                        password: form.password,
                    },
                    {
                        headers: {
                            //Prefer: 'code=200, example=200',
                            Prefer: 'code=500, example=500',
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                );

                console.log(
                    `${id}, ${form.username}, ${form.email}, "${form.password}"`
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

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-4 text-center text-uppercase'>
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
                                key='warning'
                                variant='warning'
                                className='mb-4'
                            >
                                Ocorreu um erro, tente novamente na próxima
                                rodada.
                            </Alert>
                        )}

                        {mostrarAlertaSucesso200 && (
                            <Alert
                                key='success'
                                variant='success'
                                className='mb-4'
                            >
                                <CheckCircleFill className='bi me-2' />
                                Informações salvas com sucesso.
                            </Alert>
                        )}

                        <Form noValidate onSubmit={lidarComEnvio}>
                            <Form.Group
                                className='mt-4 mb-3'
                                controlId='formLoginUsername'
                            >
                                <Form.Label>Nome completo</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type='text'
                                    placeholder='Digite o seu nome'
                                    value={form.username}
                                    onChange={(e) =>
                                        lidarComAsMudancasNosCampos(
                                            'username',
                                            e.target.value
                                        )
                                    }
                                    isInvalid={!!erros.username}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.username}
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
                                    value={form.email}
                                    onChange={(e) =>
                                        lidarComAsMudancasNosCampos(
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    isInvalid={!!erros.email}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                className='mb-3'
                                controlId='formLoginSenha'
                            >
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type='password'
                                    placeholder='Digite sua senha'
                                    value={form.password}
                                    onChange={(e) =>
                                        lidarComAsMudancasNosCampos(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                    isInvalid={!!erros.password}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <ButtonBlock
                                variant='primary'
                                type='submit'
                                disabled={enviadandoDados}
                                size='lg'
                                className='d-flex align-items-center justify-content-center'
                            >
                                {enviadandoDados && (
                                    <Carregando
                                        largura={1.5}
                                        altura={1.5}
                                        cor='#000'
                                        className='me-2'
                                    />
                                )}
                                Salvar
                            </ButtonBlock>
                        </Form>
                    </BgForm>
                </Row>
            </Container>
        </>
    );
}
