import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';

import { Container, Nav, Navbar, Badge } from 'react-bootstrap';

import { ReactComponent as IconeCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as LogoGamaZoneDark } from '../../assets/logo-gama-zone-dark.svg';
import { Header } from './style';

import MenuLogin from './MenuLogin';
import MenuLogado from './MenuLogado';
import CarrinhoOffcanvas from 'componentes/Carrinho';
import { mostrar } from 'store/modules/menu';
import { useLocation, matchPath } from 'react-router';

export default function Topo() {
    const dispatch = useAppDispatch();
    const estaLogado = useAppSelector((state) => state.authSlice._id);
    const carrinhoState = useAppSelector((state) => state.carrinhoSlice);
    const produtosNoCarrinho = carrinhoState.carrinho.length;
    const { pathname } = useLocation();
    const ehPaginaDeCheckout = matchPath(pathname, '/finalizar-compra');

    return (
        <>
            <Header>
                <Navbar bg='dark' expand='lg' variant='dark' className='py-3'>
                    <Container fluid='xl'>
                        {!ehPaginaDeCheckout && (
                            <Navbar.Toggle aria-controls='basic-navbar-nav' />
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
                                <Navbar.Collapse
                                    id='navbar-main'
                                    className='text-uppercase'
                                >
                                    <Nav className='justify-content-between flex-grow-1 gap-3 m-3 m-lg-0'>
                                        <div className='d-flex flex-lg-row flex-column gap-3'>
                                            <NavLink
                                                to='/'
                                                end
                                                className={'nav-link'}
                                            >
                                                Inicio
                                            </NavLink>

                                            <NavLink
                                                to='/produtos'
                                                className={'nav-link'}
                                            >
                                                Produtos
                                            </NavLink>
                                        </div>
                                        {estaLogado ? (
                                            <MenuLogado />
                                        ) : (
                                            <MenuLogin />
                                        )}
                                    </Nav>
                                </Navbar.Collapse>
                            </>
                        )}
                    </Container>
                </Navbar>
            </Header>

            <CarrinhoOffcanvas />
        </>
    );
}
