import { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Row,
    Stack,
} from 'react-bootstrap';
import { Box2Heart, CreditCard, HouseAdd, Rocket } from 'react-bootstrap-icons';
import {
    ContainerResumoPedido,
    DadosDoResumoPedido,
    ResumoPedido,
} from './style';
import { useAppSelector } from 'hooks';
import { precoFormatadoParaReal } from 'utils';
import Carregando from 'componentes/Carregando';
import axios from 'axios';

interface FormCamposEndereco {
    rua: string;
    bairro: string;
    numero: string;
    complemento: string;
    cidade: string;
}

interface FormErrosEndereco {
    rua: string | null;
    bairro: string | null;
    numero: string | null;
    complemento: string | null;
    cidade: string | null;
    estado: string | null;
}

export default function Checkout() {
    const estados = [
        'AC', // Acre
        'AL', // Alagoas
        'AP', // Amapá
        'AM', // Amazonas
        'BA', // Bahia
        'CE', // Ceará
        'DF', // Distrito Federal
        'ES', // Espírito Santo
        'GO', // Goiás
        'MA', // Maranhão
        'MT', // Mato Grosso
        'MS', // Mato Grosso do Sul
        'MG', // Minas Gerais
        'PA', // Pará
        'PB', // Paraíba
        'PR', // Paraná
        'PE', // Pernambuco
        'PI', // Piauí
        'RJ', // Rio de Janeiro
        'RN', // Rio Grande do Norte
        'RS', // Rio Grande do Sul
        'RO', // Rondônia
        'RR', // Roraima
        'SC', // Santa Catarina
        'SP', // São Paulo
        'SE', // Sergipe
        'TO', // Tocantins
    ];

    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarEndereco, setMostrarEndereco] = useState(false);
    const carrinhoState = useAppSelector((state) => state.carrinhoSlice);
    const produtosNoCarrinho = carrinhoState.carrinho;
    const [valorDoFrete, setValorDoFrete] = useState<number>();
    const [valorDoPedido, setValorDoPedido] = useState<number>(0);
    const [valorTotalDoPedidoComfrete, setValorTotalDoPedidoComfrete] =
        useState<string>('R$ -');
    const [formCep, setFormCep] = useState('');
    const [erroCep, setErroCep] = useState<string | null>(null);
    const [formEndereco, setFormEndereco] = useState<FormCamposEndereco>({
        rua: '',
        bairro: '',
        numero: '',
        complemento: '',
        cidade: '',
    });

    const [formEnderecoEstado, setFormEnderecoEstado] = useState('AC');

    const [errosEndereco, setErrosEndereco] = useState<FormErrosEndereco>({
        rua: null,
        bairro: null,
        numero: null,
        complemento: null,
        cidade: null,
        estado: null,
    });

    const lidarComValorTotalDoPedidoComfrete = (
        valordoFrete = 0,
        valorTotalDoPedido: number
    ) => {
        const valorTotalDoPedidoComfrete =
            valordoFrete === undefined ? 0 : valordoFrete + valorTotalDoPedido;
        const valorTotalDoPedidoComfreteEmReais = precoFormatadoParaReal(
            valorTotalDoPedidoComfrete
        );

        setValorTotalDoPedidoComfrete(valorTotalDoPedidoComfreteEmReais);
    };

    const lidarComAsMudancasNosCampoCep = (valor: string) => {
        const resultado = valor.replace(/\D || -/g, '');
        setFormCep(resultado.slice(0, 9));

        if (!!erroCep) {
            setErroCep(null);
        }
    };

    const lidarComAsMudancasNosCamposEndereco = (
        campo: keyof FormErrosEndereco,
        valor: string
    ) => {
        setFormEndereco({
            ...formEndereco,
            [campo]: valor,
        });

        if (!!errosEndereco[campo]) {
            setErrosEndereco({
                ...errosEndereco,
                [campo]: null,
            });
        }
    };

    const validarFormEndereco = () => {
        const { rua, numero, bairro, cidade }: FormCamposEndereco =
            formEndereco;
        const novoErros = {} as FormErrosEndereco;

        if (!rua || rua === '') {
            novoErros.rua = 'Preencha seu logradouro';
        }

        if (!numero || numero === '') {
            novoErros.numero = 'Preencha o número';
        }

        if (!bairro || bairro === '') {
            novoErros.bairro = 'Preencha o bairro';
        }

        if (!cidade || cidade === '') {
            novoErros.cidade = 'Preencha a cidade';
        }

        return novoErros;
    };

    const lidarFocoCampoEndereco = (e: FormEvent) => {
        e.preventDefault();

        const errosNoFormulario = validarFormEndereco();

        if (Object.keys(errosNoFormulario).length > 0) {
            setErrosEndereco(errosNoFormulario);
        }
    };

    const lidarComAsMudancasEstado = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOptions = e.currentTarget.selectedOptions[0].value;
        console.log(selectedOptions);
        setFormEnderecoEstado(selectedOptions);
    };

    const validarFormCEP = () => {
        const cep: string = formCep;
        const cepSoNumeros = cep.replace(/\D/g, '');

        let novoErros = '';
        const validacep = /^[0-9]{8}$/;

        if (!cepSoNumeros || cepSoNumeros === '') {
            novoErros = 'Preencha o CEP';
        } else if (!validacep.test(cepSoNumeros)) {
            novoErros = 'CEP incorreto';
        }

        return novoErros;
    };

    // const calcularCep = () => {
    //     const cep: string = formCep;
    //     const cepSoNumeros = cep.replace(/\D/g, '');

    //     let args = {
    //         sCepOrigem: '01001-001',
    //         sCepDestino: cepSoNumeros,
    //         nVlPeso: '1',
    //         nCdFormato: '1',
    //         nVlComprimento: '20',
    //         nVlAltura: '20',
    //         nVlLargura: '20',
    //         nCdServico: ['04014', '04510'],
    //         nVlDiametro: '0',
    //     };
    // };

    const lidarComBuscarCep = async (e: FormEvent) => {
        e.preventDefault();
        setEnviadandoDados(false);
        setMostrarEndereco(false);
        const erroCep = validarFormCEP();

        if (erroCep !== '') {
            setErroCep(erroCep);
        } else {
            setEnviadandoDados(true);
            const cep: string = formCep;
            const cepSoNumeros = cep.replace(/\D/g, '');

            setFormEndereco({
                rua: '',
                bairro: '',
                numero: '',
                complemento: '',
                cidade: '',
            });
            setFormEnderecoEstado('');

            try {
                const resposta = await axios.get(
                    `https://viacep.com.br/ws/${cepSoNumeros}/json/`
                );

                if (!resposta.data.erro === true) {
                    setFormEndereco({
                        rua: resposta.data.logradouro,
                        bairro: resposta.data.bairro,
                        numero: '',
                        complemento: '',
                        cidade: resposta.data.localidade,
                    });
                    setFormEnderecoEstado(resposta.data.uf);
                }

                //calcularCep();
                setMostrarEndereco(true);
            } catch (error) {
                console.log(error);
            } finally {
                setEnviadandoDados(false);
            }
        }
    };

    useEffect(() => {
        const valorTotalDoPedido = () => {
            const valorTotalDoPedido = produtosNoCarrinho.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
            );
            setValorDoPedido(valorTotalDoPedido);
        };
        valorTotalDoPedido();
        lidarComValorTotalDoPedidoComfrete(valorDoFrete, valorDoPedido);
    }, [produtosNoCarrinho, valorDoFrete, valorDoPedido]);

    return (
        <>
            <Helmet>
                <title>Finalizar compra - Gama Zone</title>
                <meta
                    name='description'
                    content='Finalize sua compra com facilidade e segurança no carrinho da nossa loja de board games. Aproveite ofertas especiais e garanta diversão para toda a família.'
                />
            </Helmet>

            <Container>
                <Row>
                    <Col>
                        <h1 className='mb-0 mb-md-3 mb-lg-4  text-uppercase'>
                            Finalizar a compra
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col xs={8}>
                        <>
                            <h2 className='mt-5 mb-4 text-uppercase'>
                                <HouseAdd className='bi me-2' />
                                Endereço de entrega
                            </h2>

                            <Form noValidate onSubmit={lidarComBuscarCep}>
                                <Row>
                                    <Col md={8} lg={6} xl={5} xxl={5}>
                                        <Form.Group
                                            className='mb-3'
                                            controlId='criarProduto.ControlInputCep'
                                        >
                                            <Form.Label>CEP</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Digite CEP de entrega'
                                                    required
                                                    value={formCep}
                                                    onChange={(e) =>
                                                        lidarComAsMudancasNosCampoCep(
                                                            e.target.value
                                                        )
                                                    }
                                                    isInvalid={!!erroCep}
                                                />
                                                <Button
                                                    type='submit'
                                                    id='buscar-endereco'
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
                                                    Buscar endereço
                                                </Button>
                                                <Form.Control.Feedback type='invalid'>
                                                    {erroCep}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>

                            {mostrarEndereco && (
                                <Form noValidate>
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='criarProduto.ControlInputLogradouro'
                                            >
                                                <Form.Label>
                                                    Logradouro
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Digite nome da sua rua ou avenida'
                                                    required
                                                    value={formEndereco.rua}
                                                    onChange={(e) =>
                                                        lidarComAsMudancasNosCamposEndereco(
                                                            'rua',
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={
                                                        lidarFocoCampoEndereco
                                                    }
                                                    isInvalid={
                                                        !!errosEndereco.rua
                                                    }
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errosEndereco.rua}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} lg={4}>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='criarProduto.ControlInputNumero'
                                            >
                                                <Form.Label>Número</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Digite o número do local'
                                                    required
                                                    value={formEndereco.numero}
                                                    onChange={(e) =>
                                                        lidarComAsMudancasNosCamposEndereco(
                                                            'numero',
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={
                                                        lidarFocoCampoEndereco
                                                    }
                                                    isInvalid={
                                                        !!errosEndereco.numero
                                                    }
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errosEndereco.numero}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} lg={4}>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='criarProduto.ControlInputComplemento'
                                            >
                                                <Form.Label>
                                                    Complemento
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Digite o complemento'
                                                    required
                                                    value={
                                                        formEndereco.complemento
                                                    }
                                                    onChange={(e) =>
                                                        lidarComAsMudancasNosCamposEndereco(
                                                            'complemento',
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={
                                                        lidarFocoCampoEndereco
                                                    }
                                                    isInvalid={
                                                        !!errosEndereco.complemento
                                                    }
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errosEndereco.complemento}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} lg={4}>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='criarProduto.ControlInputBairro'
                                            >
                                                <Form.Label>Bairro</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Digite o bairro'
                                                    required
                                                    value={formEndereco.bairro}
                                                    onChange={(e) =>
                                                        lidarComAsMudancasNosCamposEndereco(
                                                            'bairro',
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={
                                                        lidarFocoCampoEndereco
                                                    }
                                                    isInvalid={
                                                        !!errosEndereco.bairro
                                                    }
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errosEndereco.bairro}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} lg={6}>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='criarProduto.ControlInputNumero'
                                            >
                                                <Form.Label>Cidade</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Digite sua cidade'
                                                    required
                                                    value={formEndereco.cidade}
                                                    onChange={(e) =>
                                                        lidarComAsMudancasNosCamposEndereco(
                                                            'cidade',
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={
                                                        lidarFocoCampoEndereco
                                                    }
                                                    isInvalid={
                                                        !!errosEndereco.cidade
                                                    }
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errosEndereco.cidade}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} lg={6}>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='criarProduto.ControlInputEstado'
                                            >
                                                <Form.Label>Estado</Form.Label>

                                                <Form.Select
                                                    aria-label='Seleção de estado'
                                                    value={formEnderecoEstado}
                                                    onChange={
                                                        lidarComAsMudancasEstado
                                                    }
                                                    onBlur={
                                                        lidarFocoCampoEndereco
                                                    }
                                                    isInvalid={
                                                        !!errosEndereco.estado
                                                    }
                                                >
                                                    {estados.map((estado) => (
                                                        <option
                                                            key={estado}
                                                            value={estado}
                                                        >
                                                            {estado}
                                                        </option>
                                                    ))}
                                                </Form.Select>

                                                <Form.Control.Feedback type='invalid'>
                                                    {errosEndereco.estado}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </>

                        <>
                            <h2 className='mt-5 mb-4 text-uppercase'>
                                <Rocket className='bi me-2' />
                                Opções de entrega
                            </h2>
                        </>

                        <>
                            <h2 className='mt-5 mb-4 text-uppercase'>
                                <CreditCard className='bi me-2' />
                                Forma de pagamento
                            </h2>
                        </>

                        <>
                            <h2 className='mt-5 mb-4 text-uppercase'>
                                <Box2Heart className='bi me-2' />
                                Revisar itens
                            </h2>
                        </>
                    </Col>

                    <Col xs={4}>
                        <ContainerResumoPedido className='sticky-top mt-5'>
                            <Stack gap={4}>
                                <Button size='lg'>Finalizar compra</Button>
                                <ResumoPedido>
                                    <DadosDoResumoPedido>
                                        <span>Itens</span>
                                        <span>
                                            {valorDoPedido === 0
                                                ? 'R$ -'
                                                : precoFormatadoParaReal(
                                                      valorDoPedido
                                                  )}
                                        </span>
                                    </DadosDoResumoPedido>
                                    <DadosDoResumoPedido>
                                        <span>Frete</span>
                                        <span>
                                            {valorDoFrete === undefined
                                                ? 'R$ -'
                                                : precoFormatadoParaReal(
                                                      valorDoFrete
                                                  )}
                                        </span>
                                    </DadosDoResumoPedido>
                                    <DadosDoResumoPedido>
                                        <span className='h5 text-uppercase m-0'>
                                            Total
                                        </span>
                                        <span className='h5 m-0'>
                                            {valorTotalDoPedidoComfrete}
                                        </span>
                                    </DadosDoResumoPedido>
                                </ResumoPedido>
                            </Stack>
                        </ContainerResumoPedido>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
