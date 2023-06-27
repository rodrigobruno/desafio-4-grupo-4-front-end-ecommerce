import { Button, Carousel, CarouselItem } from 'react-bootstrap';
import styled from 'styled-components';
import overlay from 'assets/overlay.png';
import degrade from 'assets/degrade.png';

interface Props {
    image: string;
}

export const CarouselS = styled(Carousel)`
    min-height: 450px;
`;

export const CarouselItemS = styled(CarouselItem)<Props>`
    background: url(${degrade}) bottom repeat-x, url(${overlay}),
        url(${(props) => props.image}) center / cover no-repeat;
    min-height: 450px;
    height: calc(100svh - 74px);

    @media (min-width: 992px) {
        min-height: 450px;
        height: calc(100svh - 78px);
    }
`;

export const CarouselCaption = styled.div`
    & .carousel-caption {
        top: 50%;
        transform: translateY(-50%);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3rem;
    }
`;

export const Titulo = styled.h2`
    color: var(--cor-preta-1);
    font-size: 8.625rem;
    font-weight: var(--font-weight-preta);
    line-height: 80%;
    text-transform: uppercase;
    margin-bottom: 0;

    @media (max-width: 575.98px) {
        font-size: 3.625rem;
    }
`;

export const Descricao = styled.p`
    max-width: 410px;
    color: var(--cor-preta-1);
    font-size: 1.25rem;
    font-weight: var(--font-weight-regular);
    line-height: 130%;
    margin-bottom: 0;

    @media (max-width: 575.98px) {
        font-size: 1rem;
    }
`;

export const Botao = styled(Button)`
    padding: 1rem 2rem;

    @media (max-width: 575.98px) {
        padding: 0.5rem 1rem;
    }
`;
