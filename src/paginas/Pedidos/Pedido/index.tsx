import { Helmet } from 'react-helmet-async';

export default function Pedido() {
    return (
        <>
            <Helmet>
                <title>Gama Zone - Seu pedido</title>
                <meta
                    name='description'
                    content='Acompanhe seu pedido de board game na nossa loja. Entrega rápida, status atualizado e suporte dedicado para garantir sua satisfação.'
                />
            </Helmet>
            <h1>Seus pedidos</h1>
        </>
    );
}
