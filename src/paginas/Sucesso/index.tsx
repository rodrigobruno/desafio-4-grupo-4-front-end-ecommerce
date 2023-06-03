import { Helmet } from 'react-helmet-async';

export default function Sucesso() {
    return (
        <>
            <Helmet>
                <title>Pedido realizado - Gama Zone</title>
                <meta
                    name='description'
                    content='Parabéns pelo seu pedido! Aproveite a emoção dos jogos de tabuleiro com entrega rápida e suporte excepcional. Sua diversão está a caminho!'
                />
            </Helmet>
            <h1>Pedido realizado com sucesso</h1>
        </>
    );
}
