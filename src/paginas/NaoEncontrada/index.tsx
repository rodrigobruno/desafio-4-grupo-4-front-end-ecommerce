import { Helmet } from 'react-helmet-async';

export default function NaoEncontrada() {
    return (
        <>
            <Helmet>
                <title>Página não encontrada - Gama Zone</title>
                <meta
                    name='description'
                    content='Ops! Parece que você se perdeu. Descubra a melhor seleção de jogos de tabuleiro na nossa loja e encontre diversão em vez de um erro 404.'
                />
            </Helmet>
            <h1>Página não encontrada</h1>
        </>
    );
}
