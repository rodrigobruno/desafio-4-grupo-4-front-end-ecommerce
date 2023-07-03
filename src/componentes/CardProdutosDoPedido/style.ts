import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ThumbnailDoProduto = styled(LazyLoadImage)`
    width: 50px;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    opacity: 0.8;
    transition: all 0.4s ease-in-out;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    @media (min-width: 576px) {
        width: 100px;
    }
`;

export const Container = styled.div`
    border-radius: 6px;
    padding: 1rem 1.5rem;
    display: grid;
    gap: 1rem;
    align-items: center;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;
    height: 100%;

    background-image: linear-gradient(
        to bottom,
        var(--cor-preta-6),
        var(--cor-preta-5),
        var(--cor-preta-5)
    );
    background-size: 100% 200%;
    transition: all 0.4s ease-in-out;

    @media (min-width: 576px) {
        padding: 2rem 2.5rem;
        gap: 1.5rem;
    }

    &:hover {
        background-position: 0 100%;

        & ${ThumbnailDoProduto} {
            opacity: 1;
        }
    }
`;

export const InformacoesDoProduto = styled.div`
    grid-row: 1 / 2;
    grid-column: 2 / 3;
`;

export const LinkProduto = styled(Button)`
    grid-row: 2 / 3;
    grid-column: 1 / 3;
`;
