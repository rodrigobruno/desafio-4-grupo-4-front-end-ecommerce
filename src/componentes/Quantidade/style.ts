import styled from 'styled-components';
import { Button } from 'react-bootstrap';

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
