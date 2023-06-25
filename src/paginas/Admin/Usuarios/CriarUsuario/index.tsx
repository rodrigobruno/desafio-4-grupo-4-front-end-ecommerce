import { Helmet } from 'react-helmet-async';
import FormularioUsuario from 'componentes/Admin/FormularioUsuario';

export default function AdminCriarUsuario() {
    return (
        <>
            <Helmet>
                <title>
                    Criar usuário - Painel de administração - Gama Zone
                </title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>
            <h1>CRIAR USUÁRIO (ADMINISTRADOR)</h1>

            <FormularioUsuario
                tipo='post'
                labelDoBotao='Criar usuário'
            />
        </>
    );
}
