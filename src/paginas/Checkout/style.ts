import styled from 'styled-components';

export const ContainerResumoPedido = styled.div`
    background-color: var(--cor-preta-5);
    border-radius: 6px;
    padding: 1.5rem;
    top: 1rem;
`;

export const ResumoPedido = styled.div`
    display: grid;
`;

export const DadosDoResumoPedido = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    border-top: 1px solid var(--cor-preta-4);
    padding-block: 0.5rem;
`;
