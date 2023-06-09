import styled from 'styled-components';
import Dado from './imagem/dado-carregando.svg';

interface Props {
    largura: number;
    altura: number;
    cor?: string;
}

export const CarregandoContainer = styled.div`
    overflow: hidden;
    position: relative;
    display: inline-block;
    vertical-align: -0.125em;
    width: ${({ largura }: Props) => largura}rem;
    height: ${({ altura }: Props) => altura}rem;

    &::before {
        content: '';
        display: inline-block;
        padding-bottom: 100%;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 600%;
        height: 100%;
        animation: roll 6s steps(6) infinite;
        background-color: ${({ cor }: Props) => cor};
        -webkit-mask: url(${Dado}) top / 100% 100%;
        mask: url(${Dado}) top / 100% 100%;
    }

    @keyframes roll {
        to {
            transform: translateX(-100%);
        }
    }
`;
