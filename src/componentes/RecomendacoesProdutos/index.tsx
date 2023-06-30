import { Button, Col, Row } from 'react-bootstrap';
import {
    CardContainer,
    CardOverlay,
    CardTitulo,
    ImagemContainer,
} from './style';
import { useNavigate } from 'react-router-dom';
import { ImagemQuadrada } from 'componentes/Imagem/style';
import CarregandoPagina from 'componentes/CarregandoPagina';
import { useEffect, useState } from 'react';
import { Produto } from 'types';
import { api } from 'lib/axios';

interface Props {
    categoria: string | undefined;
}

export default function RecomendacoesProdutos({ categoria }: Props) {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [estaCarregando, setEstaCarregando] = useState(true);

    const lidarComPlaceholder = (img = '') => {
        const url = img.split('.webp');
        const novaUrl = `${url[0]}-placeholder.webp`;
        return novaUrl;
    };

    useEffect(() => {
        const pegarProdutos = async () => {
            setEstaCarregando(true);
            setOcorreuErroNaRespostaApi(false);

            try {
                const resposta = await api.get(
                    `/products/?page=${1}&limit=${4}&category=${categoria}`
                );
                setProdutos(resposta.data.products);
                setOcorreuErroNaRespostaApi(false);
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };

        pegarProdutos();
    }, [categoria]);

    return (
        <>
            {!ocorreuErroNaRespostaApi && produtos.length > 0 && (
                <>
                    <Row>
                        <Col>
                            <h2 className='text-uppercase mb-5'>
                                Recomendados para você
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        {produtos.map((produto) => (
                            <Col
                                xs={12}
                                sm={12}
                                md={6}
                                lg={3}
                                xl={3}
                                xxl={3}
                                key={produto._id}
                            >
                                <CardContainer>
                                    <ImagemContainer
                                        onClick={() =>
                                            navigate(`/produto/${produto._id}`)
                                        }
                                    >
                                        <CardOverlay>
                                            <Button
                                                variant='dark'
                                                onClick={() =>
                                                    navigate(
                                                        `/produto/${produto._id}`
                                                    )
                                                }
                                            >
                                                Ver detalhes
                                            </Button>
                                        </CardOverlay>
                                        <ImagemQuadrada
                                            src={produto.img}
                                            placeholderSrc={lidarComPlaceholder(
                                                produto.img
                                            )}
                                            alt={produto.title}
                                            effect='opacity'
                                        />
                                    </ImagemContainer>
                                    <CardTitulo>{produto.title}</CardTitulo>
                                </CardContainer>
                            </Col>
                        ))}
                    </Row>
                    <CarregandoPagina visibilidade={estaCarregando} />
                </>
            )}
        </>
    );
}
