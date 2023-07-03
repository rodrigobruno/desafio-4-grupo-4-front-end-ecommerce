import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
    Form,
    Alert,
    Col,
    Container,
    Row,
    InputGroup,
    Button,
} from 'react-bootstrap';
import {
    CheckCircleFill,
    EyeFill,
    EyeSlashFill,
    PersonLock,
} from 'react-bootstrap-icons';

import { api } from 'lib/axios';
import { AxiosError } from 'axios';

import { BgForm, ButtonBlock } from '../style';
import Carregando from 'componentes/Carregando';
import { useAppSelector } from 'hooks';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';

export interface CamposFormUsuario {
    password: string;
    checkPassword: string;
}

export interface ErrosFormUsuario {
    password: string | null;
    checkPassword: string | null;
}

export default function AlterarSenha() {
    const id = useAppSelector((state) => state.authSlice._id);

    const [form, setForm] = useState<CamposFormUsuario>({
        password: '',
        checkPassword: '',
    });

    const [erros, setErros] = useState<ErrosFormUsuario>({
        password: null,
        checkPassword: null,
    });

    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarAlertaErro404, setMostrarAlertaErro404] = useState(false);
    const [mostrarAlertaSucesso200, setMostrarAlertaSucesso200] =
        useState(false);

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

    const [verSenha, setVerSenha] = useState(false);
    const [verConfirmacaoDeSenha, setVerConfirmacaoDeSenha] = useState(false);

    const lidarComVerSenha = () => {
        setVerSenha(!verSenha);
    };

    const lidarComVerConfirmacaoDeSenha = () => {
        setVerConfirmacaoDeSenha(!verConfirmacaoDeSenha);
    };

    const validarForm = () => {
        const { password, checkPassword }: CamposFormUsuario = form;
        const novoErros = {} as CamposFormUsuario;

        const validarSenha = (senha: string) => {
            const regex: RegExp =
                /^(?=.*[A-Z]{1,})(?=.*\d{1,})(?=.*[a-z]{1,})[^\s]{6,}$/;
            return regex.test(senha);
        };

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

        setMostrarAlertaErro404(false);
        setMostrarAlertaSucesso200(false);
        setEnviadandoDados(false);

        const errosNoFormulario = validarForm();

        if (Object.keys(errosNoFormulario).length > 0) {
            setErros(errosNoFormulario);
            window.scrollTo(0, 0);
        } else {
            setEnviadandoDados(true);

            try {
                await api.put(`/users/${id}`, {
                    password: form.password,
                });

                window.scrollTo(0, 0);
                return setMostrarAlertaSucesso200(true);
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    window.scrollTo(0, 0);
                    if (err.response.status === 404)
                        return setMostrarAlertaErro404(true);
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
                <title>Alterar senha - Gama Zone</title>
                <meta
                    name='description'
                    content='Faça login na nossa loja de board games e tenha acesso a vantagens exclusivas, histórico de compras e uma experiência personalizada. Junte-se a nós agora!'
                />
            </Helmet>

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-4 text-center text-uppercase'>
                            <PersonLock className='bi me-2' />
                            Alterar senha
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
                        {mostrarAlertaErro404 && (
                            <ErroAtualizarPagina classes='w-100 d-flex' />
                        )}

                        {mostrarAlertaSucesso200 && (
                            <Alert
                                key='alerta-sucesso-salvar-dados'
                                variant='success'
                                className='mb-4'
                            >
                                <CheckCircleFill className='bi me-2' />
                                Senha alterada com sucesso
                            </Alert>
                        )}

                        <Form noValidate onSubmit={lidarComEnvio}>
                            <Form.Group
                                className='mb-3'
                                controlId='formLoginSenha'
                            >
                                <Form.Label>Senha</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        size='lg'
                                        type={verSenha ? 'text' : 'password'}
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
                                            form.password === '' ? true : false
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
                                        minúscula, 1 letra maiúscula e 1 número
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
                                        onClick={lidarComVerConfirmacaoDeSenha}
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
                                                    Ocultar confirmação senha
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
                                Alterar
                            </ButtonBlock>
                        </Form>
                    </BgForm>
                </Row>
            </Container>
        </>
    );
}
