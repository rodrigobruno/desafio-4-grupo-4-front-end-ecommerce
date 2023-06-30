import styled from 'styled-components';

export const CardOverlay = styled.div`
    visibility: hidden;
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    width: calc(100% + 1rem);
    height: calc(100% + 1rem);
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
    padding: 1rem;
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

export const CardContainer = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: space-between;
    background-image: linear-gradient(
        to bottom,
        var(--cor-preta-6),
        var(--cor-preta-5),
        var(--cor-preta-5)
    );
    background-size: 100% 200%;
    height: 100%;
    padding: 1.5rem;
    transition: all 0.4s ease-in-out;

    &:hover {
        background-position: 0 100%;

        & ${ImagemContainer} {
            opacity: 1;
        }
    }
`;

export const CardTitulo = styled.h3`
    margin: 0;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: var(--font-weight-preta);
`;
