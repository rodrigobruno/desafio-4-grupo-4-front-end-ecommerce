import { AxiosError } from 'axios';
import Carregando from 'componentes/Carregando';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { api } from 'lib/axios';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { ehUmaUrlValida } from 'utils';
import { ImagemPreview } from './style';
import Placeholder from 'assets/placeholder.svg';
import { Categorias } from 'types';
import { useAppSelector } from 'hooks';

interface Props {
    tipo: 'post' | 'put';
    id?: string;
    nome?: string | null;
    preco?: string | null;
    imagem?: string | null;
    descricao?: string | null;
    categoriasProp?: Categorias[] | null;
    labelDoBotao: string;
}

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

export default function FormularioProduto({
    tipo,
    id,
    nome,
    preco,
    imagem,
    descricao,
    categoriasProp,
    labelDoBotao,
}: Props) {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [listaDeCategorias, setListaDeCategorias] = useState<Categorias[]>(
        []
    );
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarAlertaSucesso200, setMostrarAlertaSucesso200] =
        useState(false);
    const [mostrarAlertaErro500, setMostrarAlertaErro500] = useState(false);
    const [mostrarAlertaErro404, setMostrarAlertaErro404] = useState(false);

    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        return ((e.target as HTMLImageElement).src = Placeholder);
    };

    useEffect(() => {
        const pegarCategorias = async () => {
            setEstaCarregando(true);
            setMostrarAlertaErro404(false);
            setMostrarAlertaSucesso200(false);

            try {
                const resposta = await api.get(
                    `/categories/?page=1&limit=100`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    }
                );
                setListaDeCategorias(resposta.data.categories);
            } catch (error) {
                window.scrollTo(0, 0);
                setMostrarAlertaErro404(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarCategorias();
    }, [accessToken]);

    const [form, setForm] = useState<FormCampos>({
        nome: nome || '',
        preco: preco || '',
        imagem: imagem || '',
        descricao: descricao || '',
    });
    const [categorias, setCategorias] = useState<Categorias[]>(
        categoriasProp || []
    );

    const [erros, setErros] = useState<FormErros>({
        nome: null,
        preco: null,
        imagem: null,
        categorias: null,
        descricao: null,
    });

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

    const lidarComAsMudancasSelect = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOptions = e.currentTarget.selectedOptions;
        const novasCategories = [];

        for (let i = 0; i < selectedOptions.length; i++) {
            const obj = {
                _id: selectedOptions[i].value,
                title: selectedOptions[i].text,
            };
            novasCategories.push(obj);
        }

        setCategorias(novasCategories);
    };

    const validarForm = () => {
        const { nome, preco, imagem, descricao }: FormCampos = form;
        const categoria: Categorias[] = categorias;
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
                if (tipo === 'post') {
                    await api.post(
                        '/products',
                        {
                            title: form.nome,
                            desc: form.descricao,
                            img: form.imagem,
                            categories: categorias,
                            price: Number(form.preco),
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + accessToken,
                            },
                        }
                    );

                    setForm({
                        nome: '',
                        preco: '',
                        imagem: '',
                        descricao: '',
                    });
                    setCategorias([]);
                }

                if (tipo === 'put') {
                    await api.put(
                        `/products/${id}`,
                        {
                            title: form.nome,
                            desc: form.descricao,
                            img: form.imagem,
                            categories: categorias,
                            price: Number(form.preco),
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
                        <Form.Group controlId='criarProduto.ControlInputPreco'>
                            <Form.Label>Preço do produto</Form.Label>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text id='criarProduto.ControlInputPrecoSiboloReal'>
                                    R$
                                </InputGroup.Text>
                                <Form.Control
                                    type='number'
                                    placeholder='10,00'
                                    step='1.0'
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
                            </InputGroup>
                            <Form.Control.Feedback type='invalid'>
                                {erros.preco}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className='mb-3'
                            controlId='criarProduto.ControlInputImagem'
                        >
                            <Form.Label>Endereço da imagem</Form.Label>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text id='criarProduto.ControlInputThumb'>
                                    <ImagemPreview
                                        src={
                                            form.imagem === ''
                                                ? Placeholder
                                                : form.imagem
                                        }
                                        alt={form.nome}
                                        onError={onImageError}
                                    />
                                </InputGroup.Text>
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
                            </InputGroup>
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
                                value={categorias.map(
                                    (categoria) => categoria._id
                                )}
                                aria-label='Selecionar Categorias'
                                onChange={lidarComAsMudancasSelect}
                                isInvalid={!!erros.categorias}
                            >
                                {listaDeCategorias.map((categoria) => (
                                    <option
                                        key={categoria._id}
                                        value={categoria._id}
                                    >
                                        {categoria.title}
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
                            {labelDoBotao}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
