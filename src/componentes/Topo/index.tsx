import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ReactComponent as IconeCarrinho } from '../../assets/carrinho.svg';
import { ReactComponent as LogoGamaZoneDark } from '../../assets/logo-gama-zone-dark.svg';
import { Header } from './style';
import { Badge } from 'react-bootstrap';

export default function Topo() {
    return (
        <Header>
            <Navbar bg='dark' expand='md' variant='dark' className='py-3'>
                <Container fluid='xl'>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />

                    <Navbar.Brand className='me-0 me-md-4 me-lg-5'>
                        <Nav.Link as={Link} eventKey='/' to='/'>
                            <LogoGamaZoneDark />
                        </Nav.Link>
                    </Navbar.Brand>

                    <div className='navbar-nav ms-4' id='menu-carrinho'>
                        <NavLink
                            to='/carrinho'
                            className={
                                'nav-link d-flex align-items-center position-relative'
                            }
                        >
                            <IconeCarrinho />
                            <Badge className='position-absolute top-0 start-0'>
                                9
                                <span className='visually-hidden'>
                                    unread messages
                                </span>
                            </Badge>
                        </NavLink>
                    </div>

                    <Navbar.Collapse
                        id='navbar-main'
                        className='text-uppercase'
                    >
                        <Nav className='justify-content-between flex-grow-1 gap-3 m-3 m-md-0'>
                            <div className='d-flex flex-md-row flex-column gap-3'>
                                <NavLink to='/' end className={'nav-link'}>
                                    Inicio
                                </NavLink>

                                <NavLink to='/produtos' className={'nav-link'}>
                                    Produtos
                                </NavLink>
                            </div>
                            <div className='d-flex flex-md-row flex-column gap-3'>
                                <NavLink to='/entrar' className={'nav-link'}>
                                    Entrar
                                </NavLink>

                                <NavLink to='/cadastrar' className={'nav-link'}>
                                    Cadastrar
                                </NavLink>

                                {/* <NavLink
                                    id='menu-carrinho'
                                    to='/carrinho'
                                    className={
                                        'nav-link d-flex align-items-center position-relative'
                                    }
                                >
                                    <IconeCarrinho />
                                    <Badge className='position-absolute top-0 start-0'>
                                        9
                                        <span className='visually-hidden'>
                                            unread messages
                                        </span>
                                    </Badge>
                                </NavLink> */}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Header>
    );
}
