import { Button, OffcanvasBody } from 'react-bootstrap';
import styled from 'styled-components';

export const OffCanvasBody = styled(OffcanvasBody)`
    display: grid;
    grid-template-rows: 1fr auto;
    border-top: 1px solid var(--cor-preta-5);
    padding-top: 0;
`;

export const Produtos = styled.div`
    border-bottom: 1px solid var(--cor-preta-5);
    overflow: auto;
    padding-inline: 1rem;
`;

export const FinalizarCompra = styled(Button)`
    width: 100%;
`;
