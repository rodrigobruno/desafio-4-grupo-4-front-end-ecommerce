import styled from 'styled-components';

interface Props {
    active: boolean;
}

export const Sidebar = styled.div<Props>`
    display: grid;
    grid-template-rows: auto auto 1fr;
    height: 100vh;
    background-color: var(--cor-preta-5);
    padding: 1.5rem;
    overflow: auto;
    position: fixed;
    transition: width 0.15s ease-in-out;
    z-index: 99;
    box-shadow: 3px 0px 5px 0px var(--cor-preta-6);

    ${({ active }) =>
        active
            ? `width: 250px;`
            : `width: auto;
               @media (min-width: 768px) {
                width: 250px;
               }
        `}
`;

export const Abrir = styled.div`
    margin-bottom: 0.75rem;
    height: 30px;
    cursor: pointer;
    display: block;
    @media (min-width: 768px) {
        display: none;
    }
`;

export const Overlay = styled.div<Props>`
    @media (max-width: 767.98px) {
        background-color: var(--cor-preta-6);
        opacity: 0.8;
        position: fixed;
        transition: width 0.15s ease-in-out;
        height: 100vh;
        ${({ active }) =>
            active
                ? `z-index: 98;
            width: 100vw;
            `
                : `z-index: 0;
            width: 0;
        `}
    }
`;
