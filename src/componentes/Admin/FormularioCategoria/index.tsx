import { AxiosError } from 'axios';
import Carregando from 'componentes/Carregando';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { useAppSelector } from 'hooks';
import { api } from 'lib/axios';
import { FormEvent, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

interface Props {
    tipo: 'post' | 'put';
    id?: string;
    nome?: string | null;
    labelDoBotao: string;
}

interface FormCampos {
    nome: string;
}

interface FormErros {
    nome: string | null;
}

export default function FormularioCategoria({
    tipo,
    id,
    nome,
    labelDoBotao,
}: Props) {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarAlertaSucesso200, setMostrarAlertaSucesso200] =
        useState(false);
    const [mostrarAlertaErro500, setMostrarAlertaErro500] = useState(false);
    const [mostrarAlertaErro404, setMostrarAlertaErro404] = useState(false);

    const [form, setForm] = useState<FormCampos>({
        nome: nome || '',
    });

    const [erros, setErros] = useState<FormErros>({
        nome: null,
    });

    const lidarComAsMudancasNosCampos = (
        campo: keyof FormErros,
        valor: any
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
        const { nome }: FormCampos = form;
        const novoErros = {} as FormErros;

        if (!nome || nome === '') {
            novoErros.nome = 'Preencha o nome da categoria';
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
                    await api.post(
                        '/categories',
                        {
                            title: form.nome,
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + accessToken,
                            },
                        }
                    );

                    setForm({
                        nome: '',
                    });
                }

                if (tipo === 'put') {
                    await api.put(
                        `/categories/${id}`,
                        {
                            title: form.nome,
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + accessToken,
                            },
                        }
                    );
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
                            controlId='criarProduto.ControlInputNome'
                        >
                            <Form.Label>Nome da categoria</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Digite o nome da categoria'
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

                        <Button
                            variant='primary'
                            type='submit'
                            disabled={enviadandoDados}
                        >
                            {enviadandoDados && (
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
        </>
    );
}
