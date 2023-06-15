import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';

export const CardImagem = styled(Card.Img)`
    aspect-ratio: 1 / 1;
    object-fit: contain;
    padding: 2.625rem 1.5rem 3rem 1.5rem;
    opacity: 0.8;
    transition: all 0.4s ease-in-out;
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

        & ${CardImagem} {
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
