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

    display: block;
    @media (min-width: 768px) {
        display: none;
    }
`;
