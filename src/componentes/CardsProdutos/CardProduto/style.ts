import styled from 'styled-components';
import { Button, Card } from 'react-bootstrap';

export const CardOverlay = styled.div`
    visibility: hidden;
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    z-index: 10;
    border-radius: 6px;
    background: var(--cor-preta-6);
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        var(--cor-preta-6) 100%
    );
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.4s ease-in-out;
`;

export const ImagemContainer = styled.div`
    padding: 2.625rem 1.5rem 3rem 1.5rem;
    opacity: 0.8;
    transition: all 0.4s ease-in-out;
    position: relative;
    cursor: pointer;

    &:hover {
        ${CardOverlay} {
            visibility: visible;
            opacity: 1;
        }
    }
`;

export const CardContainer = styled(Card)`
    background-image: linear-gradient(
        to bottom,
        var(--cor-preta-6),
        var(--cor-preta-5),
        var(--cor-preta-5)
    );
    background-size: 100% 200%;
    transition: all 0.4s ease-in-out;

    &:hover {
        background-position: 0 100%;

        & ${ImagemContainer} {
            opacity: 1;
        }
    }
`;

export const CardTitulo = styled(Card.Title)`
    margin-bottom: 1.5rem;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: var(--font-weight-preta);
`;

export const CardSubTitulo = styled(Card.Title)`
    margin-bottom: 2rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: var(--font-weight-regular);
`;

export const CardButton = styled(Button)`
    font-weight: var(--font-weight-bold);
`;

export const CardFooter = styled.footer`
    padding-bottom: 2.625rem;
`;
