import { Helmet } from 'react-helmet-async';

export default function Cadastrar() {
    return (
        <>
            <Helmet>
                <title>Criar cadastro - Gama Zone</title>
                <meta
                    name='description'
                    content='Cadastre-se agora em nossa loja de board game e tenha acesso a promoções exclusivas, novidades e uma experiência única para os amantes de jogos de tabuleiro.'
                />
            </Helmet>
            <h1>Cadastrar</h1>
        </>
    );
}
