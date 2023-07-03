import styled from 'styled-components';

export const Container = styled.div`
    background-color: var(--cor-preta-5);
    border-radius: 6px;
    padding: 2rem 2.5rem;
    display: grid;
    gap: 1.5rem;
    align-items: center;
    grid-auto-flow: row;

    @media (min-width: 992px) {
        grid-auto-flow: column;
        grid-template-columns: auto repeat(2, 1fr) auto;
    }
`;

export const Botoes = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Imagem = styled.img`
    aspect-ratio: 1 / 1;
    object-fit: contain;
    width: 100px;
    height: 100px;
`;
