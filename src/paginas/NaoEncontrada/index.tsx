import { Helmet } from 'react-helmet-async';
import carta from './images/carta.png';
import fala from './images/fala.svg';
import { Carta, Container, Content, Encarar, Fala, IrEmbora } from './style';
import { ReactComponent as IrEmboraSvg } from './images/ir-embora.svg';
import { ReactComponent as EncararSvg } from './images/encarar.svg';
import { useNavigate } from 'react-router-dom';

export default function NaoEncontrada() {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Página não encontrada - Gama Zone</title>
                <meta
                    name='description'
                    content='Ops! Parece que você se perdeu. Descubra a melhor seleção de jogos de tabuleiro na nossa loja e encontre diversão em vez de um erro 404.'
                />
            </Helmet>

            <Container>
                <Content>
                    <IrEmbora onClick={() => navigate(`/`)}>
                        <IrEmboraSvg />
                    </IrEmbora>
                    <Fala>
                        <img
                            src={fala}
                            alt='Você esta perdido. Vá embora agora ou encare minha fúria implacável.'
                        />
                    </Fala>
                    <Encarar onClick={() => navigate(`/produtos/`)}>
                        <EncararSvg />
                    </Encarar>
                    <Carta>
                        <img src={carta} alt='Carta de RPG com título 404' />
                    </Carta>
                </Content>
            </Container>
        </>
    );
}
