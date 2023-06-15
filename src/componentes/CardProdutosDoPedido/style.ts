import styled from 'styled-components';

export const ThumbnailProduto = styled.img`
    width: 100px;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    opacity: 0.8;
    transition: all 0.4s ease-in-out;
`;

export const Container = styled.div`
    border-radius: 6px;
    padding: 2rem 2.5rem;
    display: grid;
    gap: 1.5rem;
    align-items: center;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;

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

        & ${ThumbnailProduto} {
            opacity: 1;
        }
    }

    /* @media (min-width: 992px) {
        grid-auto-flow: column;
        grid-template-columns: 2fr repeat(3, 1fr) auto;
    } */
`;
