import { Helmet } from 'react-helmet-async';

export default function Entrar() {
    return (
        <>
            <Helmet>
                <title>Entrar - Gama Zone</title>
                <meta
                    name='description'
                    content='Faça login na nossa loja de board games e tenha acesso a vantagens exclusivas, histórico de compras e uma experiência personalizada. Junte-se a nós agora!'
                />
            </Helmet>
            <h1>Entrar</h1>
        </>
    );
}
