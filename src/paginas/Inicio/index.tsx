import { Helmet } from 'react-helmet-async';
import CardsProdutos from 'componentes/CardsProdutos';

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
            <CardsProdutos limite={true} quantidade={3} />
        </>
    );
}
