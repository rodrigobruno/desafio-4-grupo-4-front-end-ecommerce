import { useAppDispatch, useAppSelector } from 'hooks';
import { Badge, Button, Offcanvas, Stack } from 'react-bootstrap';
import { Box2HeartFill } from 'react-bootstrap-icons';
import { esconder, mostrar } from 'store/modules/menu';
import CardProdutoCarrinho from './CardProduto';
import { precoFormatadoParaReal } from 'utils';
import { esvaziarCarrinho } from 'store/modules/carrinho';
import { FinalizarCompra, OffCanvasBody, Produtos } from './style';
import { Link } from 'react-router-dom';

export default function CarrinhoOffcanvas() {
    const dispatch = useAppDispatch();
    const estaLogado = useAppSelector((state) => state.authSlice._id);
    const menuState = useAppSelector((state) => state.menuSlice.alternar);
    const carrinhoState = useAppSelector((state) => state.carrinhoSlice);
    const produtosNoCarrinhoQuantidade = carrinhoState.carrinho.length;
    const produtosNoCarrinho = carrinhoState.carrinho;

    const valorTotalDoPedido = () => {
        const valorTotalDoPedido = produtosNoCarrinho.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );
        const valorTotalDoPedidoEmReais =
            precoFormatadoParaReal(valorTotalDoPedido);
        return valorTotalDoPedidoEmReais;
    };

    return (
        <Offcanvas
            show={menuState}
            onShow={() => dispatch(mostrar())}
            onHide={() => dispatch(esconder())}
            placement='end'
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='text-uppercase'>
                    <div className='d-flex align-items-center'>
                        <Box2HeartFill className='me-2' />
                        Caixinha
                        <Badge className='ms-2' bg='light' text='dark'>
                            {produtosNoCarrinhoQuantidade}
                            <span className='visually-hidden'>
                                produtos no carrinho
                            </span>
                        </Badge>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <OffCanvasBody>
                {produtosNoCarrinho.length > 0 ? (
                    <>
                        <Produtos>
                            {produtosNoCarrinho.map((produto) => (
                                <CardProdutoCarrinho
                                    key={produto.product._id}
                                    {...produto}
                                />
                            ))}
                        </Produtos>
                        <Stack gap={4} className='mt-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='h4 text-uppercase mb-0'>
                                    <small className='text-body-secondary'>
                                        Total
                                    </small>{' '}
                                    {valorTotalDoPedido()}
                                </div>

                                <Button
                                    as='a'
                                    variant='link'
                                    className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
                                    onClick={() => dispatch(esvaziarCarrinho())}
                                >
                                    <small className='text-right'>
                                        Esvaziar caixinha
                                    </small>
                                </Button>
                            </div>
                            <Link
                                to={
                                    estaLogado
                                        ? '/carrinho'
                                        : '/entrar?origem=carrinho'
                                }
                            >
                                <FinalizarCompra
                                    onClick={() => dispatch(esconder())}
                                >
                                    Finalizar comprar
                                </FinalizarCompra>
                            </Link>
                            <Button
                                variant='outline-primary'
                                onClick={() => dispatch(esconder())}
                            >
                                Escolher mais produtos
                            </Button>
                        </Stack>
                    </>
                ) : (
                    <p className='my-3'>
                        Nenhum produto adicionado ao carrinho.
                    </p>
                )}
            </OffCanvasBody>
        </Offcanvas>
    );
}
