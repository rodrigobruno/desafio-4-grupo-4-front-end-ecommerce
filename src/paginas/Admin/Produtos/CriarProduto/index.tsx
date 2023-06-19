import { Helmet } from 'react-helmet-async';
import { FormEvent, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { api } from 'lib/axios';
import { ehUmaUrlValida } from 'utils';
import Carregando from 'componentes/Carregando';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { AxiosError } from 'axios';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';

interface FormCampos {
    nome: string;
    preco: string;
    imagem: string;
    descricao: string;
}

interface FormErros {
    nome: string | null;
    preco: string | null;
    imagem: string | null;
    categorias: string | null;
    descricao: string | null;
}

export default function AdminCriarProduto() {
    const listaDeCategorias = [
        'Jogo cooperativo',
        'Jogo de cartas',
        'Jogo de dados',
        'Jogo de dedução',
        'Jogo de entrada',
        'Jogo de estratégia',
        'Jogo de festa',
        'Jogo expert',
        'Jogo festivo',
    ];

    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarAlertaSucesso200, setMostrarAlertaSucesso200] =
        useState(false);
    const [mostrarAlertaErro500, setMostrarAlertaErro500] = useState(false);
    const [mostrarAlertaErro404, setMostrarAlertaErro404] = useState(false);

    const [form, setForm] = useState<FormCampos>({
        nome: '',
        preco: '',
        imagem: '',
        descricao: '',
    });

    const [categorias, setCategorias] = useState<string[]>([]);
    const [erros, setErros] = useState<FormErros>({
        nome: null,
        preco: null,
        imagem: null,
        categorias: null,
        descricao: null,
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

    const lidarComAsMudancasSelect = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOptions = e.currentTarget.selectedOptions;

        const novasCategories = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            novasCategories.push(selectedOptions[i].value);
        }

        setCategorias(novasCategories);
    };

    const validarForm = () => {
        const { nome, preco, imagem, descricao }: FormCampos = form;
        const categoria: string[] = categorias;
        const novoErros = {} as FormErros;

        if (!nome || nome === '') {
            novoErros.nome = 'Preencha o nome do produto';
        }

        if (!preco || Number(preco) < 0.1) {
            novoErros.preco = 'Preencha um preço maior que 1 centavo';
        }

        if (!categoria || categoria.length === 0) {
            novoErros.categorias = 'Selecione pelo menos 1 categoria';
        }

        if (!imagem || imagem === '') {
            novoErros.imagem = 'Preencha o endereço da imagem';
        } else if (!ehUmaUrlValida(imagem)) {
            novoErros.imagem = 'Preencha um endereço da imagem válida';
        }

        if (!descricao || descricao === '') {
            novoErros.descricao = 'Preencha a descrição do produto';
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
                await api.post('/products', {
                    title: form.nome,
                    desc: form.descricao,
                    img: form.imagem,
                    categories: categorias,
                    price: Number(form.preco),
                });

                setForm({
                    nome: '',
                    preco: '',
                    imagem: '',
                    descricao: '',
                });
                setCategorias([]);

                window.scrollTo(0, 0);
                return setMostrarAlertaSucesso200(true);
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    window.scrollTo(0, 0);
                    if (err.response.status === 500)
                        return setMostrarAlertaErro500(true);
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
                <title>
                    Criar produto - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

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
                            Produto criado com sucesso.
                        </Alert>
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    <h1 className='mb-0 mb-md-3 mb-lg-4 text-uppercase'>
                        Criar produto
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form noValidate onSubmit={lidarComEnvio}>
                        <Form.Group
                            className='mb-3'
                            controlId='criarProduto.ControlInputNome'
                        >
                            <Form.Label>Nome do produto</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Digite o nome do produto'
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
                            controlId='criarProduto.ControlInputPreco'
                        >
                            <Form.Label>Preço do produto</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='10,00'
                                step='0.01'
                                min='0.1'
                                required
                                value={form.preco}
                                onChange={(e) =>
                                    lidarComAsMudancasNosCampos(
                                        'preco',
                                        e.target.value
                                    )
                                }
                                isInvalid={!!erros.preco}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.preco}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className='mb-3'
                            controlId='criarProduto.ControlInputImagem'
                        >
                            <Form.Label>Endereço da imagem</Form.Label>
                            <Form.Control
                                type='url'
                                placeholder='https://www.example.com/imagem.png'
                                required
                                value={form.imagem}
                                onChange={(e) =>
                                    lidarComAsMudancasNosCampos(
                                        'imagem',
                                        e.target.value
                                    )
                                }
                                isInvalid={!!erros.imagem}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.imagem}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className='mb-3'
                            controlId='criarProduto.ControlCategorias'
                        >
                            <Form.Label>Categorias</Form.Label>
                            <Form.Select
                                multiple
                                required
                                value={categorias}
                                aria-label='Selecionar Categorias'
                                onChange={lidarComAsMudancasSelect}
                                isInvalid={!!erros.categorias}
                            >
                                {listaDeCategorias.map((categoria) => (
                                    <option key={categoria} value={categoria}>
                                        {categoria}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>
                                {erros.categorias}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className='mb-3'
                            controlId='criarProduto.ControlDescricao'
                        >
                            <Form.Label>Descrição do produto</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={5}
                                required
                                value={form.descricao}
                                onChange={(e) =>
                                    lidarComAsMudancasNosCampos(
                                        'descricao',
                                        e.target.value
                                    )
                                }
                                isInvalid={!!erros.descricao}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.descricao}
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
                            Criar produto
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
