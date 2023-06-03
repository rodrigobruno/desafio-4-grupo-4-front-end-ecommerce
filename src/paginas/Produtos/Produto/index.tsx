import { Helmet } from 'react-helmet-async';

export default function Produto() {
    return (
        <>
            <Helmet>
                <title>Produto - Gama Zone</title>
                <meta
                    name='description'
                    content='Descubra o jogo de tabuleiro perfeito na nossa loja. Descrição detalhada, avaliações de clientes e entrega rápida. A diversão está a apenas um clique de distância!'
                />
            </Helmet>
            <h1>Produto</h1>
        </>
    );
}
