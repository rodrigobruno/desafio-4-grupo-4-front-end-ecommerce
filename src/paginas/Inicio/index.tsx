import { Helmet } from 'react-helmet-async';

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
            <h1>Inicio</h1>
        </>
    );
}
