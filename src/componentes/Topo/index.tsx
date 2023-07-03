import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';

import {
    Container,
    Nav,
    Navbar,
    Badge,
    Offcanvas,
    Button,
} from 'react-bootstrap';

import { ReactComponent as IconeCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as LogoGamaZoneDark } from '../../assets/logo-gama-zone-dark.svg';
import { Header, NavLinkS } from './style';

import CarrinhoOffcanvas from 'componentes/Carrinho';
import { mostrar } from 'store/modules/menu';
import { useLocation, matchPath } from 'react-router';
import { logout } from 'store/modules/usuario';
import { useState } from 'react';

export default function Topo() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const ehPaginaDeCheckout = matchPath(pathname, '/finalizar-compra');
    const dispatch = useAppDispatch();
    const estaLogado = useAppSelector((state) => state.authSlice._id);
    const ehAdmin = useAppSelector(
        (state) => state?.authSlice.isAdmin === true
    );
    const carrinhoState = useAppSelector((state) => state.carrinhoSlice);
    const produtosNoCarrinho = carrinhoState.carrinho.length;

    const [show, setShow] = useState(false);
    const lidarComOffCanvas = () => setShow(!show);

    return (
        <>
            <Header>
                <Navbar bg='dark' expand='lg' variant='dark' className='py-3'>
                    <Container fluid='xl'>
                        {!ehPaginaDeCheckout && (
                            <Navbar.Toggle
                                aria-controls='navbar-main'
                                onClick={lidarComOffCanvas}
                            />
                        )}

                        <Navbar.Brand className='me-0 me-lg-5'>
                            <Nav.Link as={Link} eventKey='/' to='/'>
                                <LogoGamaZoneDark />
                            </Nav.Link>
                        </Navbar.Brand>

                        {!ehPaginaDeCheckout && (
                            <>
                                <div
                                    className='navbar-nav ms-0 ms-md-4'
                                    id='menu-carrinho'
                                >
                                    <div
                                        className={
                                            'nav-link d-flex align-items-center position-relative'
                                        }
                                        onClick={() => dispatch(mostrar())}
                                        role='button'
                                    >
                                        <IconeCarrinho />
                                        <Badge className='position-absolute top-0 start-0'>
                                            {produtosNoCarrinho}
                                            <span className='visually-hidden'>
                                                produtos no carrinho
                                            </span>
                                        </Badge>
                                    </div>
                                </div>
                                <Navbar.Offcanvas
                                    id='navbar-main'
                                    className='text-uppercase'
                                    aria-labelledby='navbar-main-titulo'
                                    placement='start'
                                    show={show}
                                    onHide={lidarComOffCanvas}
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title
                                            id='navbar-main-titulo'
                                            className='a text-uppercase'
                                        >
                                            Menu
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className='justify-content-between flex-grow-1 gap-3 m-3 m-lg-0'>
                                            <div className='d-flex flex-lg-row flex-column gap-3'>
                                                <NavLinkS
                                                    to='/'
                                                    onClick={lidarComOffCanvas}
                                                    className='nav-link'
                                                >
                                                    Inicio
                                                </NavLinkS>
                                                <NavLinkS
                                                    to='/produtos'
                                                    onClick={lidarComOffCanvas}
                                                    className='nav-link'
                                                >
                                                    Produtos
                                                </NavLinkS>
                                            </div>
                                            {estaLogado ? (
                                                <div className='d-flex flex-lg-row flex-column gap-3'>
                                                    <NavLinkS
                                                        to='/pedidos'
                                                        onClick={
                                                            lidarComOffCanvas
                                                        }
                                                        className='nav-link'
                                                    >
                                                        Seus pedidos
                                                    </NavLinkS>

                                                    <NavLinkS
                                                        to='/perfil'
                                                        onClick={
                                                            lidarComOffCanvas
                                                        }
                                                        className='nav-link'
                                                    >
                                                        Seus dados
                                                    </NavLinkS>

                                                    {ehAdmin && (
                                                        <NavLinkS
                                                            to='/admin'
                                                            onClick={
                                                                lidarComOffCanvas
                                                            }
                                                            className='nav-link'
                                                        >
                                                            Painel
                                                            <span className='d-lg-none d-xl-none d-inline-block d-xxl-inline-block'>
                                                                &ensp;Administrativo
                                                            </span>
                                                        </NavLinkS>
                                                    )}

                                                    <Nav.Link
                                                        onClick={() => {
                                                            dispatch(logout());
                                                            setShow(!show);
                                                        }}
                                                        as='button'
                                                        className='text-start text-uppercase'
                                                    >
                                                        Sair
                                                    </Nav.Link>
                                                </div>
                                            ) : (
                                                <div className='d-flex flex-lg-row flex-column gap-3'>
                                                    <NavLinkS
                                                        to='/cadastrar'
                                                        onClick={
                                                            lidarComOffCanvas
                                                        }
                                                        className='nav-link'
                                                    >
                                                        Cadastrar
                                                    </NavLinkS>

                                                    <Button
                                                        variant='outline-primary'
                                                        onClick={() => {
                                                            navigate('/entrar');
                                                            setShow(!show);
                                                        }}
                                                    >
                                                        Entrar
                                                    </Button>
                                                </div>
                                            )}
                                        </Nav>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </>
                        )}
                    </Container>
                </Navbar>
            </Header>

            <CarrinhoOffcanvas />
        </>
    );
}
