import { Helmet } from 'react-helmet-async';
import CardsProdutos from 'componentes/CardsProdutos';
import Banner from 'componentes/Banner';
import { Container } from 'react-bootstrap';

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
                <CardsProdutos limite={3} />
            </Container>
        </>
    );
}
