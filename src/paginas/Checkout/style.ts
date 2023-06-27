import { Button, Col } from 'react-bootstrap';
import styled from 'styled-components';

interface MostrarResumo {
    mostrarResumo: boolean;
}

export const CheckoutPassos = styled.div`
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    border-top: 1px solid var(--cor-preta-4-5);
`;

export const CheckoutCol = styled.div<MostrarResumo>`
    @media (max-width: 767.98px) {
        ${({ mostrarResumo }) => {
            return `margin-bottom: ${mostrarResumo ? '250px' : '100px'};`;
        }}
    }
`;

export const Resumo = styled(Col)`
    @media (max-width: 767.98px) {
        position: fixed;
        z-index: 3;
        padding: 0;
        left: 0;
        bottom: 0;
    }
`;

export const ContainerResumoPedido = styled.div<MostrarResumo>`
    display: grid;
    background-color: var(--cor-preta-5);
    border-radius: 6px;
    padding: 1.5rem;
    gap: 1.5rem;
    top: 1.5rem;
    margin-top: 1.5rem;

    @media (max-width: 767.98px) {
        top: 0;
        padding-bottom: 0.5rem;
        box-shadow: 0px -3px 5px 0px var(--cor-preta-6);
    }

    ${({ mostrarResumo }) => {
        return `gap: ${mostrarResumo ? '1.5rem' : '0.5rem'};`;
    }}
`;

export const ResumoPedido = styled.div`
    display: grid;
`;

export const ResumoPedidoAlternar = styled.div<MostrarResumo>`
    ${({ mostrarResumo }) => {
        return mostrarResumo
            ? ''
            : `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;`;
    }}
`;

export const DadosDoResumoPedido = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    border-top: 1px solid var(--cor-preta-4-5);
    padding-block: 0.5rem;
`;

export const TotalResumoPedido = styled(DadosDoResumoPedido)<MostrarResumo>`
    grid-template-columns: repeat(3, 1fr);
    cursor: pointer;
    ${({ mostrarResumo }) => {
        return `border-top: ${
            mostrarResumo ? '1px solid var(--cor-preta-4)' : '0'
        };`;
    }}
`;

export const Caret = styled.div`
    align-self: center;
    justify-self: center;
`;

export const ContainerSelecao = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 220px;

    @media (min-width: 992px) {
        flex-direction: row;
        width: auto;
    }
`;

export const BotaoSelecao = styled(Button)`
    text-align: left;
`;

export const PixIcon = styled.svg`
    width: 1rem;
    height: 1rem;
`;
