import { Helmet } from 'react-helmet-async';

export default function AdminCategorias() {
    return (
        <>
            <Helmet>
                <title>Categorias - Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>
            <h1>Admin Categorias</h1>
        </>
    );
}
