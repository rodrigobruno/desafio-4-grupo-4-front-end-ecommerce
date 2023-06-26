import { AxiosError } from 'axios';
import Carregando from 'componentes/Carregando';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { api } from 'lib/axios';
import { FormEvent, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

interface Users {
    tipo: 'post' | 'put';
    id?: string;
    nome?: string | null;
    usuario?: string | null;
    email?: string | null;
    senha?: string | null;
    admin?: boolean;
    labelDoBotao: string;
}

interface FormCampos {
    nome: string;
    usuario: string;
    email: string;
    senha: string;
    admin: boolean;
}

interface FormErros {
    nome: string | null;
    usuario: string | null;
    email: string | null;
    senha: string | null;
    admin: boolean;
}
export default function FormularioUsuario({
    tipo,
    id,
    nome,
    usuario,
    email,
    senha,
    admin,
    labelDoBotao,
}: Users) {
    const [form, setForm] = useState<FormCampos>({
        nome: nome || '',
        usuario: usuario || '',
        email: email || '',
        senha: senha || '',
        admin: admin || false,
    });
    const [erros, setErros] = useState<FormErros>({
        nome: null,
        usuario: null,
        email: null,
        senha: null,
        admin: false,
    });

    const [enviandoDados, setEnviadandoDados] = useState(false);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [mostrarAlertaSucesso200, setMostrarAlertaSucesso200] =
        useState(false);
    const [mostrarAlertaErro500, setMostrarAlertaErro500] = useState(false);
    const [mostrarAlertaErro404, setMostrarAlertaErro404] = useState(false);
    const [adminPut, setadminPut] = useState(false);

    const [selectedOption, setSelectedOption] = useState(false);
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value === 'true');
    };
    const validarSenha = (senha: string) => {
        const regex: RegExp = /^(?=.*[A-Z])(?=.*\d{2})(?=.*[a-z])[A-Za-z0-9]{6,10}$/;
        return regex.test(senha);
      };

    useEffect(() => {
        setEstaCarregando(false);

        setadminPut(tipo === 'put');
        setSelectedOption(admin === true);
    }, [admin, tipo]);

    const validarForm = () => {
        const { nome, usuario, email, senha }: FormCampos = form;
        const novoErros = {} as FormErros;

        if (!nome || nome === '') {
            novoErros.nome = 'Preencha seu nome completo';
        }

        if (!usuario || usuario === '') {
            novoErros.usuario = 'Preencha o nome do seu usuário';
        }

        if (!email || email === '') {
            novoErros.email = 'Preencha um e-mail válido';
        }

        if (tipo === 'post' && (!senha || senha === '')) {
            novoErros.senha = 'Preencha uma senha';
        }

        if(tipo === 'post' && !validarSenha(senha)){
            novoErros.senha = 'A senha deve conter no mínimo 6 e no máximo 10 caracteres, sendo 1 letra maiúscula, sendo no mínimo 2 números e o restante letras minuscúlas.';
        }

        return novoErros;
    };

    const lidarComEnvio = async (e: FormEvent) => {
        e.preventDefault();
        setEnviadandoDados(false);
        setMostrarAlertaSucesso200(false);
        setMostrarAlertaErro500(false);
        setMostrarAlertaErro404(false);

        const errosNoFormulario = validarForm();

        if (Object.keys(errosNoFormulario).length > 0) {
            setErros(errosNoFormulario);
            window.scrollTo(0, 0);
        } else {
            setEnviadandoDados(true);

            try {
                if (tipo === 'post') {
                    await api.post('/auth/register', {
                        nameid: form.nome,
                        username: form.usuario,
                        emails: form.email,
                        password: form.senha,
                        isAdmin: form.admin,
                    });

                    setForm({
                        nome: '',
                        usuario: '',
                        email: '',
                        senha: '',
                        admin: false,
                    });
                }

                if (tipo === 'put') {
                    await api.put(`/users/${id}`, {
                        nameid: form.nome,
                        username: form.usuario,
                        emails: form.email,
                        isAdmin: selectedOption,
                    });
                }

                window.scrollTo(0, 0);
                return setMostrarAlertaSucesso200(true);
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    window.scrollTo(0, 0);
                    if (err.response.status === 500)
                        setMostrarAlertaErro500(true);
                    if (err.response.status === 404)
                        setMostrarAlertaErro404(true);
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

    const lidarComAsMudancasNosCampos = (
        campo: keyof FormErros,
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

    //const options = ['Sim', 'Não'];

    return (
        <>
            {mostrarAlertaErro500 && (
                <Alert
                    key='alerta-erro-salvar-dados'
                    variant='warning'
                    className='mb-4'
                >
                    Ocorreu um erro, tente novamente na próxima rodada.
                </Alert>
            )}

            {mostrarAlertaErro404 && (
                <ErroAtualizarPagina classes='w-100 d-flex' />
            )}

            {mostrarAlertaSucesso200 && (
                <Row>
                    <Col>
                        <Alert
                            key='alerta-sucesso-salvar-dados'
                            variant='success'
                            className='mb-4'
                            onClose={() => setMostrarAlertaSucesso200(false)}
                            dismissible
                        >
                            <CheckCircleFill className='bi me-2' />
                            Deu tudo certo!
                        </Alert>
                    </Col>
                </Row>
            )}
            <Row>
                <Col>
                    <Form noValidate onSubmit={lidarComEnvio}>
                        <Form.Group
                            className='mb-3'
                            controlId='criarUsuario.ControlInputNome'
                        >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Digite o seu nome completo'
                                required
                                value={form.nome}
                                onChange={(e) =>
                                    lidarComAsMudancasNosCampos(
                                        'nome',
                                        e.target.value
                                    )
                                }
                                isInvalid={!!erros.nome}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.nome}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className='mb-3'
                            controlId='criarUsuario.ControlInputUsuario'
                        >
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Digite um nome de usuário'
                                required
                                value={form.usuario}
                                onChange={(e) =>
                                    lidarComAsMudancasNosCampos(
                                        'usuario',
                                        e.target.value
                                    )
                                }
                                isInvalid={!!erros.usuario}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.usuario}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className='mb-3'
                            controlId='criarUsuario.ControlInputEmail'
                        >
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Digite seu e-mail'
                                required
                                value={form.email}
                                onChange={(e) =>
                                    lidarComAsMudancasNosCampos(
                                        'email',
                                        e.target.value
                                    )
                                }
                                isInvalid={!!erros.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {!adminPut && (
                            <Form.Group
                                className='mb-3'
                                controlId='criarUsuario.ControlInputSenha'
                            >
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Digite uma senha'
                                    required
                                    value={form.senha}
                                    onChange={(e) =>
                                        lidarComAsMudancasNosCampos(
                                            'senha',
                                            e.target.value
                                        )
                                    }
                                    isInvalid={!!erros.senha}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.senha}
                                </Form.Control.Feedback>
                            </Form.Group>
                        )}

                        {adminPut && (
                            <Form.Group
                                controlId='criarUsuario.ControlInputAdmin'
                                className='mb-3'
                            >
                                <Form.Label>Administrador</Form.Label>
                                <Form.Check
                                    id='AdminSim'
                                    name='AdminSim'
                                    type='radio'
                                    label='Sim'
                                    value='true'
                                    checked={selectedOption === true}
                                    onChange={handleOptionChange}
                                />
                                <Form.Check
                                    id='AdminNao'
                                    name='AdminNao'
                                    type='radio'
                                    label='Não'
                                    value='false'
                                    checked={selectedOption === false}
                                    onChange={handleOptionChange}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.admin}
                                </Form.Control.Feedback>
                            </Form.Group>
                        )}

                        <Button
                            variant='primary'
                            type='submit'
                            disabled={enviandoDados}
                        >
                            {enviandoDados && (
                                <Carregando
                                    largura={1}
                                    altura={1}
                                    cor='#000'
                                    className='me-2'
                                />
                            )}

                            {labelDoBotao}
                        </Button>
                    </Form>
                </Col>
            </Row>
            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
