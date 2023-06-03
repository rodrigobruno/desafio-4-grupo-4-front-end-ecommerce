import { Helmet } from 'react-helmet-async';

export default function Pedidos() {
    return (
        <>
            <Helmet>
                <title>Gama Zone - Seus pedidos</title>
                <meta
                    name='description'
                    content='Acompanhe seus pedidos de board games na nossa loja. Entrega rápida, rastreamento online e suporte dedicado para garantir sua satisfação.'
                />
            </Helmet>
            <h1>Seus pedidos</h1>
        </>
    );
}
