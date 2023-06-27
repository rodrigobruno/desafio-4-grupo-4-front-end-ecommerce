import CardDadosDoPedido from 'componentes/CardDadosDoPedido';
import CardEnderecoDoPedido from 'componentes/CardEnderecoDoPedido';
import CardProdutosDoPedido from 'componentes/CardProdutosDoPedido';
import CarregandoPagina from 'componentes/CarregandoPagina';
import { useAppSelector } from 'hooks';
import { api } from 'lib/axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Box2Heart } from 'react-bootstrap-icons';
import { PedidoProps } from 'types';

interface Props {
    pedidoId: string;
}

export default function PedidoInformacoes({ pedidoId }: Props) {
    const [pedido, setPedido] = useState<PedidoProps>();
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');

    useEffect(() => {
        const pegarPedidos = async () => {
            setOcorreuErroNaRespostaApi(false);
            setEstaCarregando(true);

            try {
                const resposta = await api.get(`/orders/${pedidoId}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });
                setPedido(resposta.data);
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarPedidos();
    }, [accessToken, pedidoId]);

    if (
        ocorreuErroNaRespostaApi ||
        !pedido ||
        Object.keys(pedido).length === 0
    ) {
        return (
            <>
                <CarregandoPagina visibilidade={estaCarregando} />
                <Container>
                    <Row>
                        <Col>
                            <h3 className='mb-3'>Pedido não encontado.</h3>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} md={6} className='mb-4 mb-md-0'>
                        <CardDadosDoPedido
                            status={pedido.status}
                            data={pedido.createdAt}
                            total={pedido.amount}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <CardEnderecoDoPedido
                            rua={pedido.address.rua}
                            numero={pedido.address.numero}
                            bairro={pedido.address.bairro}
                            complemento={pedido.address.complemento}
                            cep={pedido.address.cep}
                            cidade={pedido.address.cidade}
                            estado={pedido.address.estado}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className='mt-5 mb-3 text-uppercase'>
                            <Box2Heart className='bi me-2' />
                            Produtos adquiridos
                        </h2>
                    </Col>
                </Row>
                <Row xs={1} sm={1} md={2} lg={2} xl={3} xxl={3}>
                    {pedido.products.map((produto) => {
                        return (
                            <Col className='mb-4' key={produto._id}>
                                <CardProdutosDoPedido
                                    id={produto.product._id || ''}
                                    imagem={produto.product.img || '#'}
                                    nome={produto.product.title || '-'}
                                    quantidade={produto.quantity || 0}
                                    preco={produto.product.price}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
