import { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Row,
} from 'react-bootstrap';
import {
    Box2Heart,
    CaretDownFill,
    CaretUpFill,
    CheckCircleFill,
    Circle,
    CreditCard,
    CreditCardFill,
    HouseAdd,
    Rocket,
    Upc,
    UpcScan,
} from 'react-bootstrap-icons';
import {
    BotaoSelecao,
    ContainerResumoPedido,
    DadosDoResumoPedido,
    ContainerSelecao,
    ResumoPedido,
    PixIcon,
    Resumo,
    TotalResumoPedido,
    ResumoPedidoAlternar,
    Caret,
    CheckoutCol,
    CheckoutPassos,
} from './style';
import { useAppDispatch, useAppSelector } from 'hooks';
import { precoFormatadoParaReal } from 'utils';
import Carregando from 'componentes/Carregando';
import axios, { AxiosError } from 'axios';
import { ReactComponent as Pix } from 'assets/pix.svg';
import { ReactComponent as PixFill } from 'assets/pix-fill.svg';
import CardProdutoCarrinho from './CardProduto';
import { api } from 'lib/axios';
import { useNavigate } from 'react-router-dom';
import { esvaziarCarrinho } from 'store/modules/carrinho';
import { useMediaQuery } from 'react-responsive';

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
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const dispatch = useAppDispatch();
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

    const [mostrarAlertaErroApi, setMostrarAlertaErroApi] = useState(false);
    const [mostrarResumo, setMostrarResumo] = useState(true);
    const [enviadandoDados, setEnviadandoDados] = useState(false);
    const [mostrarEndereco, setMostrarEndereco] = useState(false);
    const [valorDoFrete, setValorDoFrete] = useState<number>();
    const [valorDoPedido, setValorDoPedido] = useState<number>(0);
    const [valorTotalDoPedidoComfrete, setValorTotalDoPedidoComfrete] =
        useState<string>('R$ -');
    const [
        valorTotalDoPedidoComfreteNumero,
        setValorTotalDoPedidoComfreteNumero,
    ] = useState<number>(0);

    const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 767.98px)',
    });

    const lidarMostrarResumo = () => {
        setMostrarResumo(!mostrarResumo);
    };

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

        setValorTotalDoPedidoComfreteNumero(valorTotalDoPedidoComfrete);
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

                setMostrarEndereco(true);
            } catch (error) {
                console.log(error);
            } finally {
                setEnviadandoDados(false);
            }
        }
    };

    const [validarFrete, setValidarFrete] = useState(true);
    const [tipoFrete, setTipoFrete] = useState<string>();
    const [mostrarPagamento, setMostrarPagamento] = useState(false);

    const lidandoComFormFrete = (valor: number, tipo: string) => {
        setValorDoFrete(valor);
        setTipoFrete(tipo);
        setValidarFrete(true);
        setMostrarPagamento(true);
    };

    const [validarMetodoPagamento, setValidarMetodoPagamento] = useState(true);
    const [tipoPagamento, setTipoPagamento] = useState<string>();
    const [mostrarRevisao, setMostrarRevisao] = useState(false);
    const [ativarFinalizarCompra, setAtivarFinalizarCompra] = useState(true);
    const [statusPedido, setStatusPedido] = useState('');

    const lidandoComFormPagamento = (tipo: string) => {
        setTipoPagamento(tipo);
        setValidarMetodoPagamento(true);
        setMostrarRevisao(true);
        setAtivarFinalizarCompra(false);

        if (tipo === 'Pix' || tipo === 'Cartão de crédito') {
            setStatusPedido('Aprovado');
        } else {
            setStatusPedido('Pendente');
        }
    };

    const carrinhoState = useAppSelector((state) => state.carrinhoSlice);
    const produtosNoCarrinhoQuantidade = carrinhoState.carrinho.length;
    const produtosNoCarrinho = carrinhoState.carrinho;
    const userId = useAppSelector((state) => state.authSlice._id);
    const navigate = useNavigate();

    const lidarComEnvioPedido = async (e: FormEvent) => {
        e.preventDefault();
        const errosNoFormulario = validarFormEndereco();

        if (Object.keys(errosNoFormulario).length > 0) {
            setErrosEndereco(errosNoFormulario);
            window.scrollTo(0, 0);
        }
        if (!tipoFrete) {
            setValidarFrete(false);
        }

        if (!tipoPagamento) {
            setValidarMetodoPagamento(false);
        }

        if (
            Object.keys(errosNoFormulario).length === 0 &&
            tipoFrete &&
            tipoPagamento
        ) {
            setEnviadandoDados(false);
            setMostrarAlertaErroApi(false);

            try {
                const resposta = await api.post(
                    '/orders',
                    {
                        userId: userId,
                        products: produtosNoCarrinho,
                        amount: valorTotalDoPedidoComfreteNumero.toFixed(2),
                        address: {
                            cep: formCep,
                            rua: formEndereco.rua,
                            numero: formEndereco.numero,
                            complemento: formEndereco.complemento,
                            bairro: formEndereco.bairro,
                            cidade: formEndereco.cidade,
                            estado: formEnderecoEstado,
                        },
                        status: statusPedido,
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    }
                );

                dispatch(esvaziarCarrinho());
                navigate(`/sucesso/${resposta.data._id}`);
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) {
                    window.scrollTo(0, 0);
                    setMostrarAlertaErroApi(true);
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

        isTabletOrMobile ? setMostrarResumo(false) : setMostrarResumo(true);
    }, [isTabletOrMobile, produtosNoCarrinho, valorDoFrete, valorDoPedido]);

    return (
        <>
            <Helmet>
                <title>Finalizar compra - Gama Zone</title>
                <meta
                    name='description'
                    content='Finalize sua compra com facilidade e segurança no carrinho da nossa loja de board games. Aproveite ofertas especiais e garanta diversão para toda a família.'
                />
            </Helmet>

            <Container fluid='xxl' className='my-5'>
                <Row>
                    <Col>
                        <h1 className='mb-0 mb-md-3 mb-lg-4  text-uppercase'>
                            Finalizar a compra
                        </h1>
                    </Col>
                </Row>

                {mostrarAlertaErroApi && (
                    <Alert
                        key='alerta-erro-salvar-dados'
                        variant='warning'
                        className='mb-4'
                    >
                        Ocorreu um erro, tente novamente na próxima rodada.
                    </Alert>
                )}

                <Row>
                    <Col xs={12} md={6} lg={8}>
                        <CheckoutCol mostrarResumo={mostrarResumo}>
                            <CheckoutPassos>
                                <h2 className='mb-4 text-uppercase'>
                                    <HouseAdd className='bi me-2' />
                                    Endereço de entrega
                                </h2>

                                <Form noValidate onSubmit={lidarComBuscarCep}>
                                    <Row>
                                        <Col md={12} lg={6} xl={5} xxl={5}>
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
                                                        variant='light'
                                                        type='submit'
                                                        id='buscar-endereco'
                                                        disabled={
                                                            enviadandoDados
                                                        }
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
                                                    <Form.Label>
                                                        Número
                                                    </Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        placeholder='Digite o número do local'
                                                        required
                                                        value={
                                                            formEndereco.numero
                                                        }
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
                                                        {
                                                            errosEndereco.complemento
                                                        }
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col xs={12} lg={4}>
                                                <Form.Group
                                                    className='mb-3'
                                                    controlId='criarProduto.ControlInputBairro'
                                                >
                                                    <Form.Label>
                                                        Bairro
                                                    </Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        placeholder='Digite o bairro'
                                                        required
                                                        value={
                                                            formEndereco.bairro
                                                        }
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
                                                    <Form.Label>
                                                        Cidade
                                                    </Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        placeholder='Digite sua cidade'
                                                        required
                                                        value={
                                                            formEndereco.cidade
                                                        }
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
                                                    <Form.Label>
                                                        Estado
                                                    </Form.Label>

                                                    <Form.Select
                                                        aria-label='Seleção de estado'
                                                        value={
                                                            formEnderecoEstado
                                                        }
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
                                                        {estados.map(
                                                            (estado) => (
                                                                <option
                                                                    key={estado}
                                                                    value={
                                                                        estado
                                                                    }
                                                                >
                                                                    {estado}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Select>

                                                    <Form.Control.Feedback type='invalid'>
                                                        {errosEndereco.estado}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </CheckoutPassos>

                            <CheckoutPassos>
                                <h2 className='mb-4 text-uppercase'>
                                    <Rocket className='bi me-2' />
                                    Opções de entrega
                                </h2>

                                {mostrarEndereco && (
                                    <>
                                        <ContainerSelecao>
                                            <BotaoSelecao
                                                onClick={() =>
                                                    lidandoComFormFrete(
                                                        15.3,
                                                        'Pac'
                                                    )
                                                }
                                                variant={
                                                    tipoFrete === 'Pac'
                                                        ? 'light'
                                                        : 'outline-light'
                                                }
                                            >
                                                {tipoFrete === 'Pac' ? (
                                                    <CheckCircleFill className='bi me-2' />
                                                ) : (
                                                    <Circle className='bi me-2' />
                                                )}
                                                Pac 5 dias - R$ 15,30
                                            </BotaoSelecao>

                                            <BotaoSelecao
                                                onClick={() =>
                                                    lidandoComFormFrete(
                                                        22.5,
                                                        'Sedex'
                                                    )
                                                }
                                                variant={
                                                    tipoFrete === 'Sedex'
                                                        ? 'light'
                                                        : 'outline-light'
                                                }
                                            >
                                                {tipoFrete === 'Sedex' ? (
                                                    <CheckCircleFill className='bi me-2' />
                                                ) : (
                                                    <Circle className='bi me-2' />
                                                )}
                                                Sedex 1 dia - R$ 22,50
                                            </BotaoSelecao>

                                            <BotaoSelecao
                                                onClick={() =>
                                                    lidandoComFormFrete(
                                                        0,
                                                        'Retirar'
                                                    )
                                                }
                                                variant={
                                                    tipoFrete === 'Retirar'
                                                        ? 'light'
                                                        : 'outline-light'
                                                }
                                            >
                                                {tipoFrete === 'Retirar' ? (
                                                    <CheckCircleFill className='bi me-2' />
                                                ) : (
                                                    <Circle className='bi me-2' />
                                                )}
                                                Retirar 1 dia - Grátis
                                            </BotaoSelecao>
                                        </ContainerSelecao>

                                        {!validarFrete && (
                                            <div className='invalid-feedback d-block'>
                                                Selecione uma das opções de
                                                entrega
                                            </div>
                                        )}
                                    </>
                                )}
                            </CheckoutPassos>

                            <CheckoutPassos>
                                <h2 className='mb-4 text-uppercase'>
                                    <CreditCard className='bi me-2' />
                                    Forma de pagamento
                                </h2>

                                {mostrarPagamento && (
                                    <>
                                        <ContainerSelecao>
                                            <BotaoSelecao
                                                onClick={() =>
                                                    lidandoComFormPagamento(
                                                        'Pix'
                                                    )
                                                }
                                                variant={
                                                    tipoPagamento === 'Pix'
                                                        ? 'light'
                                                        : 'outline-light'
                                                }
                                            >
                                                {tipoPagamento === 'Pix' ? (
                                                    <PixIcon className='bi me-2'>
                                                        <PixFill />
                                                    </PixIcon>
                                                ) : (
                                                    <PixIcon className='bi me-2'>
                                                        <Pix />
                                                    </PixIcon>
                                                )}
                                                Pix
                                            </BotaoSelecao>

                                            <BotaoSelecao
                                                onClick={() =>
                                                    lidandoComFormPagamento(
                                                        'Boleto'
                                                    )
                                                }
                                                variant={
                                                    tipoPagamento === 'Boleto'
                                                        ? 'light'
                                                        : 'outline-light'
                                                }
                                            >
                                                {tipoPagamento === 'Boleto' ? (
                                                    <UpcScan className='bi me-2' />
                                                ) : (
                                                    <Upc className='bi me-2' />
                                                )}
                                                Boleto
                                            </BotaoSelecao>

                                            <BotaoSelecao
                                                onClick={() =>
                                                    lidandoComFormPagamento(
                                                        'Cartão de crédito'
                                                    )
                                                }
                                                variant={
                                                    tipoPagamento ===
                                                    'Cartão de crédito'
                                                        ? 'light'
                                                        : 'outline-light'
                                                }
                                            >
                                                {tipoPagamento ===
                                                'Cartão de crédito' ? (
                                                    <CreditCard className='bi me-2' />
                                                ) : (
                                                    <CreditCardFill className='bi me-2' />
                                                )}
                                                Cartão de crédito
                                            </BotaoSelecao>
                                        </ContainerSelecao>

                                        {!validarMetodoPagamento && (
                                            <div className='invalid-feedback d-block'>
                                                Selecione um método de pagamento
                                            </div>
                                        )}
                                    </>
                                )}
                            </CheckoutPassos>

                            <CheckoutPassos>
                                <h2 className='mb-4 text-uppercase'>
                                    <Box2Heart className='bi me-2' />
                                    Revisar itens
                                </h2>

                                {mostrarRevisao &&
                                    produtosNoCarrinho.length > 0 && (
                                        <>
                                            {produtosNoCarrinho.map(
                                                (produto) => (
                                                    <CardProdutoCarrinho
                                                        key={
                                                            produto.product._id
                                                        }
                                                        {...produto}
                                                    />
                                                )
                                            )}

                                            {!isTabletOrMobile && (
                                                <Button
                                                    className='mt-4'
                                                    size='lg'
                                                    onClick={
                                                        lidarComEnvioPedido
                                                    }
                                                    disabled={
                                                        ativarFinalizarCompra ||
                                                        enviadandoDados
                                                    }
                                                >
                                                    {enviadandoDados && (
                                                        <Carregando
                                                            largura={1}
                                                            altura={1}
                                                            cor='#000'
                                                            className='me-2'
                                                        />
                                                    )}
                                                    Finalizar compra
                                                </Button>
                                            )}
                                        </>
                                    )}
                            </CheckoutPassos>
                        </CheckoutCol>
                    </Col>

                    <Resumo xs={12} md={6} lg={4}>
                        <ContainerResumoPedido
                            mostrarResumo={mostrarResumo}
                            className='sticky-top'
                        >
                            <Button
                                size='lg'
                                onClick={lidarComEnvioPedido}
                                disabled={
                                    ativarFinalizarCompra || enviadandoDados
                                }
                            >
                                {enviadandoDados && (
                                    <Carregando
                                        largura={1}
                                        altura={1}
                                        cor='#000'
                                        className='me-2'
                                    />
                                )}
                                Finalizar compra
                            </Button>

                            <ResumoPedido>
                                <ResumoPedidoAlternar
                                    aria-hidden={mostrarResumo}
                                    mostrarResumo={mostrarResumo}
                                    onClick={lidarMostrarResumo}
                                >
                                    <DadosDoResumoPedido>
                                        <span>Pagamento por</span>
                                        <span>
                                            <span>
                                                {tipoPagamento === undefined
                                                    ? '-'
                                                    : tipoPagamento}
                                            </span>
                                        </span>
                                    </DadosDoResumoPedido>
                                    <DadosDoResumoPedido>
                                        <span>
                                            {produtosNoCarrinhoQuantidade > 1
                                                ? `${produtosNoCarrinhoQuantidade} itens`
                                                : `${produtosNoCarrinhoQuantidade} item`}
                                        </span>
                                        <span>
                                            {valorDoPedido === 0
                                                ? 'R$ -'
                                                : precoFormatadoParaReal(
                                                      valorDoPedido
                                                  )}
                                        </span>
                                    </DadosDoResumoPedido>
                                    <DadosDoResumoPedido>
                                        <span>Frete {tipoFrete}</span>
                                        <span>
                                            {valorDoFrete === undefined
                                                ? 'R$ -'
                                                : valorDoFrete === 0
                                                ? 'Grátis'
                                                : precoFormatadoParaReal(
                                                      valorDoFrete
                                                  )}
                                        </span>
                                    </DadosDoResumoPedido>
                                </ResumoPedidoAlternar>

                                <TotalResumoPedido
                                    mostrarResumo={mostrarResumo}
                                    onClick={lidarMostrarResumo}
                                >
                                    <span className='h5 text-uppercase m-0'>
                                        Total
                                    </span>
                                    <Caret>
                                        {isTabletOrMobile && (
                                            <>
                                                {mostrarResumo ? (
                                                    <CaretDownFill />
                                                ) : (
                                                    <CaretUpFill />
                                                )}
                                            </>
                                        )}
                                    </Caret>
                                    <span className='h5 m-0 text-end'>
                                        {valorTotalDoPedidoComfrete}
                                    </span>
                                </TotalResumoPedido>
                            </ResumoPedido>
                        </ContainerResumoPedido>
                    </Resumo>
                </Row>
            </Container>
        </>
    );
}
