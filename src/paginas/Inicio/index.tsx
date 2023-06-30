import { Helmet } from 'react-helmet-async';
import CardsProdutos from 'componentes/CardsProdutos';
import Banner from 'componentes/Banner';
import { Col, Container } from 'react-bootstrap';
import { TituloSecoes } from './style';

export default function Inicio() {
    return (
        <>
            <Helmet>
                <title>Gama Zone</title>
                <meta
                    name='description'
                    content='A Gama Zone loja especializada em board games que oferece uma experiência única para entusiastas de jogos de tabuleiro. Possui uma ampla variedade de títulos.'
                />
            </Helmet>

            <Banner />

            <Container fluid='xl' className='py-5'>
                <Col>
                    <TituloSecoes>Destaques</TituloSecoes>
                </Col>
                <CardsProdutos limite={3} />

                <Col className='mt-5'>
                    <TituloSecoes>Estratégia</TituloSecoes>
                </Col>
                <CardsProdutos
                    limite={3}
                    categoria='649460523ec28ae97e061718'
                />

                <Col className='mt-5'>
                    <TituloSecoes>Cartas</TituloSecoes>
                </Col>
                <CardsProdutos
                    limite={3}
                    categoria='649460773ec28ae97e06171e'
                />

                <Col className='mt-5'>
                    <TituloSecoes>Cooperativo</TituloSecoes>
                </Col>
                <CardsProdutos
                    limite={3}
                    categoria='649460843ec28ae97e061724'
                />
            </Container>
        </>
    );
}
