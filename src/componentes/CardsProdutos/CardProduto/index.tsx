import { useState } from 'react';
import { Card, Col, Toast, ToastContainer } from 'react-bootstrap';
import { Produto } from 'types';
import { precoFormatadoParaReal } from 'utils';
// import Placeholder from 'assets/placeholder.svg';
import {
    CardContainer,
    CardImagem,
    CardTitulo,
    CardSubTitulo,
    CardButton,
    CardFooter,
    ToastBodyColor,
} from './style';
import { useAppDispatch } from 'hooks';
import { adicionarProduto } from 'store/modules/carrinho';
import { Produtos } from 'types';
import { Box2Heart, CheckCircle } from 'react-bootstrap-icons';

export default function CardProduto({ _id, title, price, img }: Produto) {
    const dispatch = useAppDispatch();
    const preco = precoFormatadoParaReal(price);
    const [mostrarToast, setMostrarToast] = useState(false);

    const produto: Produtos = {
        product: {
            _id: _id,
            title: title,
            img: img,
            price: price,
        },
        quantity: 1,
    };

    const lidarComAdicionarProduto = (produto: Produtos) => {
        dispatch(adicionarProduto(produto));
        setMostrarToast(true);
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
                    <CardImagem
                        src={img}
                        placeholderSrc={lidarComPlaceholder(img)}
                        alt={title}
                    />
                    <Card.Body>
                        <CardTitulo>{title}</CardTitulo>
                        <CardSubTitulo>{preco}</CardSubTitulo>
                    </Card.Body>
                    <CardFooter>
                        <CardButton
                            variant='primary'
                            onClick={() => lidarComAdicionarProduto(produto)}
                        >
                            <Box2Heart className='bi me-2' />
                            Adicionar a caixinha
                        </CardButton>
                    </CardFooter>
                </CardContainer>
            </Col>
            <ToastContainer
                position='top-center'
                className='position-fixed mt-3'
            >
                <Toast
                    bg='success'
                    onClose={() => setMostrarToast(false)}
                    show={mostrarToast}
                    delay={3000}
                    autohide
                >
                    <ToastBodyColor>
                        <CheckCircle className='bi me-2' />
                        Produto adicionado a sua box!
                    </ToastBodyColor>
                </Toast>
            </ToastContainer>
        </>
    );
}
