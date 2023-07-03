import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const Coluna = styled(Col)`
    @media (max-width: 1399.98px) {
        margin-bottom: 3rem;
    }
`;

export const Titulo = styled.h2`
    align-self: center;
    text-transform: uppercase;
`;

export const Numero = styled.div`
    align-self: center;
`;

export const NumeroContent = styled.div`
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--cor-preta-1-1);
    border-radius: 999em;
    text-align: center;
    font-weight: var(--font-weight-preta);
    font-size: 4rem;
`;
