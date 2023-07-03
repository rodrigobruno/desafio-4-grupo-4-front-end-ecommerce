import styled from 'styled-components';

export const TituloSecoes = styled.h3`
    color: var(--cor-preta-1-1);
    text-align: center;
    font-weight: var(--font-weight-preta);
    line-height: 130%;
    text-transform: uppercase;
    margin: 0 0 4rem 0;
    font-size: 5rem;

    @media (max-width: 768px) {
        margin: 0 0 3rem 0;
        font-size: 4rem;
    }

    @media (max-width: 576px) {
        margin: 0 0 2rem 0;
        font-size: 3rem;
    }
`;
