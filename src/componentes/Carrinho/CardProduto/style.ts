import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const Produto = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr auto;
    align-items: center;
    gap: 1rem;

    & img {
        max-width: 100%;
    }

    @media (max-width: 374px) {
        grid-template-columns: 1fr auto;

        & img {
            display: none;
        }
    }

    border-top: 1px solid var(--cor-preta-5);
    border-bottom: 1px solid var(--cor-preta-5);
    padding-block: 1rem;
`;

export const Titulo = styled.div`
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-weight: var(--font-weight-preta);
    text-transform: uppercase;
    margin-bottom: 0.3rem;
`;

export const Preco = styled.div`
    font-size: 1rem;
    height: 29px;
    line-height: 29px;
    margin-right: 1rem;
    min-width: 85px;
`;

export const Quantidade = styled.div`
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    vertical-align: middle;
    font-weight: var(--font-weight-regular);
`;

export const BotaoExcluir = styled(Button)`
    border: 0;

    &:hover {
        background-color: var(--cor-preta-2);
    }

    &:active {
        background-color: var(--cor-preta-1) !important;
    }
`;

export const BotaoQuantidades = styled(BotaoExcluir)``;
