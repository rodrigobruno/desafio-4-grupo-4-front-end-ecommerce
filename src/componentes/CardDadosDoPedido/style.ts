import styled from 'styled-components';

export const Container = styled.div`
    background-color: var(--cor-preta-5);
    border-radius: 6px;
    padding: 2rem 2.5rem;
    height: 100%;
`;

export const ContainerDados = styled.div`
    display: grid;
    gap: 2rem;
    grid-auto-flow: row;

    & .card-pedido__detalhes {
        justify-self: center;
    }

    @media (min-width: 992px) {
        grid-auto-flow: column;
        grid-template-columns: repeat(3, 1fr);
    }
`;
