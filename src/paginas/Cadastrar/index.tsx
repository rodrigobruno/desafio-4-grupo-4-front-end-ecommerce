import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Form,
    Alert,
    Col,
    Row,
    InputGroup,
    Button,
    Container,
} from 'react-bootstrap';
import {
    EyeFill,
    EyeSlashFill,
    PersonCircle,
    PersonVcard,
} from 'react-bootstrap-icons';

import { api } from 'lib/axios';
import { AxiosError } from 'axios';

import { Background, BgForm, ButtonBlock } from './style';
import Carregando from 'componentes/Carregando';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';

export interface CamposFormUsuario {
    nameid: string;
    username: string;
    emails: string;
    password: string;
    checkPassword: string;
}

export interface ErrosFormUsuario {
    nameid: string | null;
    username: string | null;
    emails: string | null;
    password?: string | null;
    checkPassword: string | null;
}

export default function Cadastrar() {
    const navigate = useNavigate();

    const [form, setForm] = useState<CamposFormUsuario>({
        nameid: '',
        username: '',
        emails: '',
        password: '',
        checkPassword: '',
    });

    const [erros, setErros] = useState<ErrosFormUsuario>({
        nameid: null,
        username: null,
        emails: null,
        password: null,
        checkPassword: null,
    });

    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarAlertaErro500, setMostrarAlertaErro500] = useState(false);
    const [mostrarAlertaErro404, setMostrarAlertaErro404] = useState(false);

    const [verSenha, setVerSenha] = useState(false);
    const [verConfirmacaoDeSenha, setVerConfirmacaoDeSenha] = useState(false);

    const lidarComVerSenha = () => {
        setVerSenha(!verSenha);
    };

    const lidarComVerConfirmacaoDeSenha = () => {
        setVerConfirmacaoDeSenha(!verConfirmacaoDeSenha);
    };

    const lidarComAsMudancasNosCampos = (
        campo: keyof ErrosFormUsuario,
        valor: string
    ) => {
        if (campo === 'username') {
            const novoValor = valor.replace(/\s/g, '');
            setForm({
                ...form,
                [campo]: novoValor,
            });
        } else {
            setForm({
                ...form,
                [campo]: valor,
            });
        }

        if (!!erros[campo]) {
            setErros({
                ...erros,
                [campo]: null,
            });
        }
    };

    const validarForm = () => {
        const {
            username,
            nameid,
            emails,
            password,
            checkPassword,
        }: CamposFormUsuario = form;
        const novoErros = {} as CamposFormUsuario;

        const ehEmail = (email: string) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emails);

        const validarSenha = (senha: string) => {
            const regex: RegExp =
                /^(?=.*[A-Z]{1,})(?=.*\d{1,})(?=.*[a-z]{1,})[A-Za-z0-9]{6,}$/;
            return regex.test(senha);
        };

        const validarUsername = (username: string) => {
            const regex: RegExp = /^[a-z0-9_.]+$/;
            return regex.test(username);
        };

        if (!username || username === '') {
            novoErros.username = 'Preencha o nome de usuário';
        } else if (username.length < 3) {
            novoErros.username = 'O nome deve ter mais do que 3 caracteres';
        } else if (!validarUsername(username)) {
            novoErros.username = `Não é permitido espaços, letras maiúsculas e @!#$%^\u00B4\u0060&*?/|,:"<'([{-+\u005C`;
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

        if (!password || password === '') {
            novoErros.password = 'Preencha a senha';
        } else if (!validarSenha(password)) {
            novoErros.password =
                'Pelo menos 6 caracteres, 1 letra minúscula, 1 letra maiúscula e 1 número';
        }

        if (!checkPassword || checkPassword === '') {
            novoErros.checkPassword = 'Preencha a confirmação de senha';
        }

        if (password !== checkPassword) {
            novoErros.checkPassword = 'As senhas não são iguais';
        }

        return novoErros;
    };

    const lidarComEnvio = async (e: FormEvent) => {
        e.preventDefault();

        setMostrarAlertaErro500(false);
        setMostrarAlertaErro404(false);
        setEnviadandoDados(false);

        const errosNoFormulario = validarForm();

        if (Object.keys(errosNoFormulario).length > 0) {
            setErros(errosNoFormulario);
        } else {
            setEnviadandoDados(true);

            try {
                await api.post(`/auth/register`, {
                    nameid: form.nameid,
                    username: form.username,
                    emails: form.emails,
                    password: form.password,
                });

                navigate('/entrar');
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    window.scrollTo(0, 0);
                    if (err.response.status === 404)
                        return setMostrarAlertaErro404(true);
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
                <title>Cadatrar - Gama Zone</title>
                <meta
                    name='description'
                    content='Faça login na nossa loja de board games e tenha acesso a vantagens exclusivas, histórico de compras e uma experiência personalizada. Junte-se a nós agora!'
                />
            </Helmet>

            <Background>
                <Container className='py-5'>
                    <Row>
                        <Col>
                            <h1 className='mb-5 text-center text-uppercase'>
                                <PersonVcard className='bi me-2' />
                                Identificação
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
                            <h2 className='mb-4 text-uppercase'>
                                <PersonCircle className='bi me-2' />
                                Criar uma conta
                            </h2>

                            {mostrarAlertaErro500 && (
                                <Alert
                                    key='alerta-erro-salvar-dados'
                                    variant='warning'
                                    className='mb-4'
                                >
                                    Nome, usuário ou e-mail já cadastrado.
                                </Alert>
                            )}

                            {mostrarAlertaErro404 && (
                                <ErroAtualizarPagina classes='w-100 d-flex' />
                            )}

                            <Form noValidate onSubmit={lidarComEnvio}>
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
                                    controlId='formLoginUsername'
                                >
                                    <Form.Label>Nome de usuário</Form.Label>
                                    <Form.Control
                                        size='lg'
                                        type='text'
                                        placeholder='Digite um um usuário'
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

                                    {!erros.username && (
                                        <Form.Text className='text-muted'>
                                            {`Não é permitido espaços, letras maiúsculas e @!#$%^\u00B4\u0060&*?/|,:"<'([{-+\u005C`}
                                        </Form.Text>
                                    )}
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

                                <Form.Group
                                    className='mb-3'
                                    controlId='formLoginSenha'
                                >
                                    <Form.Label>Senha</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            size='lg'
                                            type={
                                                verSenha ? 'text' : 'password'
                                            }
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
                                        <Button
                                            tabIndex={-1}
                                            variant='outline-light'
                                            id='ver-senha'
                                            onClick={lidarComVerSenha}
                                            disabled={
                                                form.password === ''
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {verSenha ? (
                                                <>
                                                    <EyeSlashFill className='bi' />
                                                    <span className='visually-hidden'>
                                                        Ocultar senha
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <EyeFill className='bi' />
                                                    <span className='visually-hidden'>
                                                        Ver senha
                                                    </span>
                                                </>
                                            )}
                                        </Button>

                                        <Form.Control.Feedback type='invalid'>
                                            {erros.password}
                                        </Form.Control.Feedback>
                                    </InputGroup>

                                    {!erros.password && (
                                        <Form.Text className='text-muted'>
                                            Pelo menos 6 caracteres, 1 letra
                                            minúscula, 1 letra maiúscula e 1
                                            número
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group
                                    className='mb-3'
                                    controlId='formLoginSenha'
                                >
                                    <Form.Label>Confirmar senha</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            size='lg'
                                            type={
                                                verConfirmacaoDeSenha
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder='Repita a senha'
                                            value={form.checkPassword}
                                            onChange={(e) =>
                                                lidarComAsMudancasNosCampos(
                                                    'checkPassword',
                                                    e.target.value
                                                )
                                            }
                                            isInvalid={!!erros.checkPassword}
                                            required
                                        />

                                        <Button
                                            tabIndex={-1}
                                            variant='outline-light'
                                            id='ver-confirmacao-senha'
                                            onClick={
                                                lidarComVerConfirmacaoDeSenha
                                            }
                                            disabled={
                                                form.checkPassword === ''
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {verConfirmacaoDeSenha ? (
                                                <>
                                                    <EyeSlashFill className='bi' />
                                                    <span className='visually-hidden'>
                                                        Ocultar confirmação
                                                        senha
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <EyeFill className='bi' />
                                                    <span className='visually-hidden'>
                                                        Ver confirmação senha
                                                    </span>
                                                </>
                                            )}
                                        </Button>

                                        <Form.Control.Feedback type='invalid'>
                                            {erros.checkPassword}
                                        </Form.Control.Feedback>
                                    </InputGroup>
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
                                    Cadastrar
                                </ButtonBlock>
                            </Form>

                            <Alert
                                key='primary'
                                variant='primary'
                                className='mt-5 mb-0 text-center'
                            >
                                Já é cliente?{' '}
                                <LinkContainer to='/entrar'>
                                    <Alert.Link>Entrar na conta</Alert.Link>
                                </LinkContainer>
                            </Alert>
                        </BgForm>
                    </Row>
                </Container>
            </Background>
        </>
    );
}
