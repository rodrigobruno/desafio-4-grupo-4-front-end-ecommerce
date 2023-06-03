import { Helmet } from 'react-helmet-async';

export default function Produtos() {
    return (
        <>
            <Helmet>
                <title>Nossos produtos - Gama Zone</title>
                <meta
                    name='description'
                    content='Encontre os melhores board games na nossa loja online. Uma variedade incrível de jogos de tabuleiro para todos os gostos. Compre agora e mergulhe na diversão!'
                />
            </Helmet>
            <h1>Nossos produtos</h1>
        </>
    );
}
