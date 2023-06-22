import { Helmet } from 'react-helmet-async';

export default function AdminInicio() {
    return (
        <>
            <Helmet>
                <title>Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>
            <div>
                <h1>Admin Inicio</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    accumsan condimentum ex laoreet scelerisque. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Class aptent taciti sociosqu ad
                    litora torquent per conubia nostra, per inceptos himenaeos.
                    Integer ut nisl luctus, euismod massa suscipit, aliquet
                    lacus. Etiam feugiat nibh tincidunt, accumsan ante in,
                    volutpat neque. Integer vestibulum at nulla ut ultricies. Ut
                    hendrerit maximus neque, eget pellentesque diam rutrum in.
                    Mauris gravida, turpis efficitur sodales fringilla, dolor
                    massa fringilla nunc, ut luctus nisi diam vel turpis.
                </p>
            </div>
        </>
    );
}
