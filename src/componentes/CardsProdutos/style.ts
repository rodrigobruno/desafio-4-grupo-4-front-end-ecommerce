import { Row } from 'react-bootstrap';
import styled from 'styled-components';

export const StickyTop = styled(Row)`
    margin-bottom: 1.5rem;
    margin-top: -1.5rem;
    position: sticky;
    top: 10px;
    padding: 1rem;
    width: fit-content;
    margin-inline: auto;
    z-index: 1020;
    background-color: var(--cor-preta-5);
    border-radius: 6px;

    @media (max-width: 350px) {
        padding-inline: 0;
    }

    & .dropdown.btn-group {
        min-width: 145px;
    }
`;

export const FiltroTitulo = styled.div`
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: var(--font-weight-preta);

    @media (max-width: 350px) {
        font-size: 1rem;
    }
`;
