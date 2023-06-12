import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Alert, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { api } from 'lib/axios';
import { AxiosError } from 'axios';

import { useAppDispatch } from 'hooks';
import { login } from 'store/modules/usuario';
import { LoginResponse, CamposFormUsuario, ErrosFormUsuario } from 'types';

import { Background, BgForm, ButtonBlock } from './style';
import Carregando from 'componentes/Carregando';

export default function Entrar() {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<CamposFormUsuario>({
        username: '',
        email: '',
        password: '',
    });

    const [erros, setErros] = useState<ErrosFormUsuario>({
        username: null,
        email: null,
        password: null,
    });

    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarAlertaErro422, setMostrarAlertaErroApi422] = useState(false);
    const [mostrarAlertaErro401, setMostrarAlertaErro401] = useState(false);

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
            novoErros.username = 'Preencha o usuário';
        } else if (username.length < 3) {
            novoErros.username = 'O usuário deve ter mais do que 3 caracteres';
        }

        if (!email || email === '') {
            novoErros.email = 'Preencha o e-mail';
        } else if (!ehEmail(email)) {
            novoErros.email = 'E-mail inválido';
        }

        if (!password || password === '') {
            novoErros.password = 'Preencha a senha';
        }

        return novoErros;
    };

    const lidarComEnvio = async (e: FormEvent) => {
        e.preventDefault();

        setMostrarAlertaErroApi422(false);
        setMostrarAlertaErro401(false);
        setEnviadandoDados(false);

        const errosNoFormulario = validarForm();

        if (Object.keys(errosNoFormulario).length > 0) {
            setErros(errosNoFormulario);
            window.scrollTo(0, 0);
        } else {
            setEnviadandoDados(true);

            try {
                const responseData: LoginResponse = await api.post(
                    '/auth/login',
                    {
                        username: form.username,
                        email: form.email,
                        password: form.password,
                    },
                    {
                        headers: {
                            Prefer: 'code=200, example=Usuário admin logado',
                            //Prefer: 'code=200, example=Usuário logado',
                            //Prefer: 'code=401',
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                );
                dispatch(login(responseData.data));
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    window.scrollTo(0, 0);
                    if (err.response.status === 401)
                        return setMostrarAlertaErro401(true);
                    if (err.response.status === 422)
                        return setMostrarAlertaErroApi422(true);
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
            <Background>
                <Container className='py-5'>
                    <Row>
                        <Col>
                            <h1 className='mb-4 text-uppercase'>
                                Identificação
                            </h1>
                        </Col>
                    </Row>
                    <Row className='mx-1 mx-sm-0'>
                        <BgForm
                            xs='12'
                            sm='12'
                            md='8'
                            lg='8'
                            xl='7'
                            xxl='5'
                            className='mb-5 p-5 p-sm-5'
                        >
                            <h2 className='mb-4 text-uppercase'>
                                Entrar na conta
                            </h2>
                            {mostrarAlertaErro422 && (
                                <Alert key='warning' variant='warning'>
                                    Não foi possível se conectar, tente na
                                    próxima rodada.
                                </Alert>
                            )}

                            {mostrarAlertaErro401 && (
                                <Alert key='danger' variant='danger'>
                                    E-mail ou senha incorretos, volte duas casas
                                    e tente novamente.
                                </Alert>
                            )}

                            <Form noValidate onSubmit={lidarComEnvio}>
                                <Form.Group
                                    className='mt-4 mb-3'
                                    controlId='formLoginUsername'
                                >
                                    <Form.Label>Usuário</Form.Label>
                                    <Form.Control
                                        size='lg'
                                        type='text'
                                        placeholder='Digite o seu usuário'
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
                                    <Form.Control.Feedback type='valid'>
                                        Looks good!
                                    </Form.Control.Feedback>
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
                                    <Form.Control.Feedback type='valid'>
                                        Looks good!
                                    </Form.Control.Feedback>
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
                                    <Form.Control.Feedback type='valid'>
                                        Looks good!
                                    </Form.Control.Feedback>
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
                                    Entrar
                                </ButtonBlock>
                            </Form>

                            <Alert
                                key='primary'
                                variant='primary'
                                className='mt-5 mb-0 text-center'
                            >
                                Não é cliente?{' '}
                                <LinkContainer to='/cadastrar'>
                                    <Alert.Link>Crie sua conta</Alert.Link>
                                </LinkContainer>
                            </Alert>
                        </BgForm>
                    </Row>
                </Container>
            </Background>
        </>
    );
}
