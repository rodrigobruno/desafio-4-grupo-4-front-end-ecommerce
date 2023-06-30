import { Button, Card, Col } from 'react-bootstrap';
import { Categorias } from 'types';
import { precoFormatadoParaReal } from 'utils';
import {
    CardContainer,
    CardTitulo,
    CardSubTitulo,
    CardButton,
    CardFooter,
    CardOverlay,
    ImagemContainer,
} from './style';
import { Produtos } from 'types';
import { Box2Heart } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { ImagemQuadrada } from 'componentes/Imagem/style';

interface Props {
    _id: string;
    title: string;
    desc?: string;
    img: string;
    categories?: Categorias[];
    price: number;
    lidarComAdicionarProduto: (produto: Produtos, mostrar: boolean) => void;
}

export default function CardProduto({
    _id,
    title,
    price,
    img,
    lidarComAdicionarProduto,
}: Props) {
    const preco = precoFormatadoParaReal(price);
    const navigate = useNavigate();

    const produto: Produtos = {
        product: {
            _id: _id,
            title: title,
            img: img,
            price: price,
        },
        quantity: 1,
    };

    const lidarComPlaceholder = (img = '') => {
        const url = img.split('.webp');
        const novaUrl = `${url[0]}-placeholder.webp`;
        return novaUrl;
    };

    return (
        <>
            <Col>
                <CardContainer className='text-center'>
                    <ImagemContainer
                        onClick={() => navigate(`/produto/${_id}`)}
                    >
                        <CardOverlay>
                            <Button
                                variant='dark'
                                onClick={() => navigate(`/produto/${_id}`)}
                            >
                                Ver detalhes
                            </Button>
                        </CardOverlay>
                        <ImagemQuadrada
                            src={img}
                            placeholderSrc={lidarComPlaceholder(img)}
                            alt={title}
                            effect='opacity'
                        />
                    </ImagemContainer>
                    <Card.Body>
                        <CardTitulo>{title}</CardTitulo>
                        <CardSubTitulo>{preco}</CardSubTitulo>
                    </Card.Body>
                    <CardFooter>
                        <CardButton
                            variant='primary'
                            onClick={() =>
                                lidarComAdicionarProduto(produto, true)
                            }
                        >
                            <Box2Heart className='bi me-2' />
                            Adicionar a caixinha
                        </CardButton>
                    </CardFooter>
                </CardContainer>
            </Col>
        </>
    );
}
