import { Col, Container, Row } from 'react-bootstrap';
import {
    Instagram,
    Facebook,
    Twitter,
    Twitch,
    Youtube,
    Discord,
} from 'react-bootstrap-icons';
import { ReactComponent as LogoGamaZoneLight } from '../../assets/logo-gama-zone-light.svg';
import { Footer, Titulo, Ul, NavLinkRodape } from './style';
import { anoAtual } from 'utils';

export default function Rodape() {
    return (
        <>
            <Footer className='py-5'>
                <Container fluid='lg'>
                    <Row className='mb-5'>
                        <Col
                            xl={4}
                            className='d-flex flex-column justify-content-between gap-4'
                        >
                            <LogoGamaZoneLight className='mw-100' />
                            <Ul className='d-flex flex-row m-0 p-0 flex-wrap'>
                                <li>
                                    <a
                                        href='https://www.instagram.com/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Instagram
                                            size={24}
                                            aria-hidden='true'
                                        />
                                        <span className='visually-hidden'>
                                            Instagram
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://www.facebook.com/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Facebook
                                            size={24}
                                            aria-hidden='true'
                                        />
                                        <span className='visually-hidden'>
                                            Facebook
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://twitter.com/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Twitter size={24} aria-hidden='true' />
                                        <span className='visually-hidden'>
                                            Twitter
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://www.twitch.tv/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Twitch size={24} aria-hidden='true' />
                                        <span className='visually-hidden'>
                                            Twitch
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://www.youtube.com/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Youtube size={24} aria-hidden='true' />
                                        <span className='visually-hidden'>
                                            Youtube
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://discord.com/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Discord size={24} aria-hidden='true' />
                                        <span className='visually-hidden'>
                                            Discord
                                        </span>
                                    </a>
                                </li>
                            </Ul>
                            <p>
                                A Gama Zone é uma loja especializada em board
                                games que oferece uma experiência única para
                                entusiastas de jogos de tabuleiro. Possui uma
                                ampla variedade de títulos, desde clássicos aos
                                lançamentos.
                            </p>
                        </Col>
                        <Col
                            md={{ span: 4, offset: 0 }}
                            xl={{ span: 2, offset: 1 }}
                            className='d-flex flex-column mt-4 mt-xl-0'
                        >
                            <Titulo>Navegue</Titulo>
                            <NavLinkRodape to='/'>Inicio</NavLinkRodape>
                            <NavLinkRodape to='/produtos'>
                                Produtos
                            </NavLinkRodape>
                            <NavLinkRodape to='/categorias'>
                                Categorias
                            </NavLinkRodape>
                            <NavLinkRodape to='/carrinho'>
                                Carrinho
                            </NavLinkRodape>
                            <NavLinkRodape to='/entrar'>Entrar</NavLinkRodape>
                            <NavLinkRodape to='/cadastrar'>
                                Cadastrar
                            </NavLinkRodape>
                        </Col>
                        <Col
                            md={4}
                            xl={2}
                            className='d-flex flex-column mt-4 mt-xl-0'
                        >
                            <Titulo>Ajuda</Titulo>
                            <NavLinkRodape to='/contato'>Contato</NavLinkRodape>
                            <NavLinkRodape to='/pedidos-e-entregas'>
                                Pedidos e entregas
                            </NavLinkRodape>
                            <NavLinkRodape to='/devolucoes'>
                                Devoluções
                            </NavLinkRodape>
                            <NavLinkRodape to='/perguntas-frequentes'>
                                Perguntas frequentes
                            </NavLinkRodape>
                            <NavLinkRodape to='/termos-e-condicoes'>
                                Termos e condições
                            </NavLinkRodape>
                            <NavLinkRodape to='/politica-de-privacidade'>
                                Política de privacidade
                            </NavLinkRodape>
                        </Col>
                        <Col
                            md={4}
                            xl={3}
                            className='d-flex flex-column mt-4 mt-xl-0'
                        >
                            <Titulo>Institucional</Titulo>
                            <NavLinkRodape to='/quem-somos'>
                                Quem somos
                            </NavLinkRodape>
                            <NavLinkRodape to='/nossa-historia'>
                                Nossa história
                            </NavLinkRodape>
                            <NavLinkRodape to='/cultura-e-valores'>
                                Cultura e valores
                            </NavLinkRodape>
                            <NavLinkRodape to='/loja-fisica'>
                                Loja física
                            </NavLinkRodape>
                            <NavLinkRodape to='/assessoria-de-imprensa'>
                                Assessoria de imprensa
                            </NavLinkRodape>
                            <NavLinkRodape to='/trabalhe-conosco'>
                                Trabalhe conosco
                            </NavLinkRodape>
                        </Col>
                    </Row>
                    <Row className='pt-5'>
                        <Col>
                            <p className='text-center mb-0'>
                                <small>
                                    Gama Zone s.a. CNPJ: 63.886.070/0001-09.
                                    Inscrição Estadual: 770.046.511.030.
                                    Endereço: Avenida Vital Brasil, 460 - São
                                    Paulo, SP - 05503-000. Telefone: (11)
                                    91869-9562. Copyright © {anoAtual()} Grupo
                                    04. Versão 1.0
                                </small>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Footer>
        </>
    );
}
