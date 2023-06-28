import { Row } from 'react-bootstrap';
import styled from 'styled-components';

export const StickyTop = styled(Row)`
    margin-bottom: 3rem;
    position: sticky;
    top: 0;
    padding-block: 1rem;
    z-index: 1020;
    background: var(--cor-preta-6);
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) 0%,
        var(--cor-preta-6) 50%,
        var(--cor-preta-6) 100%,
        var(--cor-preta-6) 100%
    );

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
