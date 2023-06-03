import { Helmet } from 'react-helmet-async';

export default function Profile() {
    return (
        <>
            <Helmet>
                <title>Seus dados - Gama Zone</title>
                <meta
                    name='description'
                    content='Protegemos seus dados com segurança na nossa loja de board games. Acesse seus detalhes pessoais de forma confiável e tenha uma experiência tranquila de compras.'
                />
            </Helmet>
            <h1>Seus dados</h1>
        </>
    );
}
