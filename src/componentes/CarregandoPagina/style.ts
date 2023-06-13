import styled from 'styled-components';

interface Props {
    visibilidade: boolean;
}

export const CarregandoPaginaContainer = styled.div<Props>`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--cor-preta-6);

    ${({ visibilidade }) => {
        return `
            visibility: ${visibilidade ? 'visible' : 'hidden'};
            opacity: ${visibilidade ? 1 : 0};
        `;
    }}
`;
