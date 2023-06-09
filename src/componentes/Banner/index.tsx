import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import {
    CarouselCaption,
    CarouselItemS,
    Descricao,
    Titulo,
    CarouselS,
} from './style';
import { useAppSelector } from 'hooks';
import { api } from 'lib/axios';
import { useNavigate } from 'react-router-dom';
import CarregandoPagina from 'componentes/CarregandoPagina';
import BotaoXl from 'componentes/BotaoXl';

interface BannersProps {
    _id: string;
    title: string;
    desc: string;
    img: string;
    idproduto: string;
}

export default function Banner() {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const navigate = useNavigate();
    const [banners, setBanner] = useState<BannersProps[]>();
    const [ocorreuErro, setOcorreuErro] = useState(false);
    const [estaCarregando, setEstaCarregando] = useState(false);

    useEffect(() => {
        const pegarBanners = async () => {
            setEstaCarregando(true);
            setOcorreuErro(false);

            try {
                const resposta = await api.get(`/banners/`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });
                setBanner(resposta.data);
            } catch (error) {
                setOcorreuErro(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarBanners();
    }, [accessToken]);

    if (!banners || banners.length === 0 || ocorreuErro) {
        return <></>;
    }

    return (
        <>
            <CarouselS fade>
                {banners.map((banner) => (
                    <CarouselItemS image={banner.img} key={banner._id}>
                        <CarouselCaption>
                            <Carousel.Caption>
                                <Titulo>{banner.title}</Titulo>
                                <Descricao>{banner.desc}</Descricao>
                                <BotaoXl
                                    onClick={() =>
                                        navigate(`/produto/${banner.idproduto}`)
                                    }
                                >
                                    Adquira já
                                </BotaoXl>
                            </Carousel.Caption>
                        </CarouselCaption>
                    </CarouselItemS>
                ))}
            </CarouselS>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
