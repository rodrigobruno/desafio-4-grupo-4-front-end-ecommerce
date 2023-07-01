import styled, { keyframes } from 'styled-components';
import cartaSombra from './images/carta-sombra.svg';

const ScaleEncarar = keyframes`
  0% {
		transform: translate(0%, -50%) scale(1);
	}

	100% {
		transform: translate(0%, -50%) scale(1.1);
	}
`;

const ScaleIrEmbora = keyframes`
  0% {
		transform: translate(-100%, -50%) scale(1);
	}

	100% {
		transform: translate(-100%, -50%) scale(1.1);
	}
`;

const SlideCarta = keyframes`
  0% {
        transform: translateY(0)
	}

	100% {
		transform: translateY(30px)
	}
`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100svh - 80px);

    /* @media (min-width: 992px) {
        min-height: calc(100svh - 85px);
    } */
`;

export const Content = styled.div`
    position: relative;
    padding-top: 60px;
    background-image: url(${cartaSombra});
    background-position: center bottom;
    background-repeat: no-repeat;
    transform: scale(0.4);

    @media (min-width: 576px) {
        transform: scale(0.6);
    }

    @media (min-width: 768px) {
        transform: scale(0.7);
    }

    @media (min-width: 992px) {
        transform: scale(0.8);
    }

    @media (min-width: 1200px) {
        transform: scale(0.9);
    }

    @media (min-width: 1400px) {
        transform: scale(1);
    }
`;

export const Carta = styled.div`
    z-index: 2;
    position: relative;
    transition: all 0.5s ease-in-out;
    animation: ${SlideCarta} 10s ease-in-out 0s infinite alternate forwards;

    &:hover {
        filter: drop-shadow(0 0 50px rgba(73, 209, 58, 0.2));
    }

    padding-bottom: 80px;
`;

export const Fala = styled.div`
    position: absolute;
    z-index: 10;
    top: 0;
    left: 100%;
    transform: translate(-60%, 0%) scale(0.8);
`;

export const Encarar = styled.div`
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 100%;
    cursor: pointer;

    & #luz {
        opacity: 0;
        transition: all 0.5s ease-in-out;
    }

    &:hover #luz {
        opacity: 1;
    }

    animation: ${ScaleEncarar} 5s ease-in-out 0s infinite alternate forwards;
`;

export const IrEmbora = styled.div`
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 0;
    cursor: pointer;
    animation: ${ScaleIrEmbora} 5s ease-in-out 0s infinite alternate forwards;

    & #luz {
        opacity: 0;
        transition: all 0.5s ease-in-out;
    }

    &:hover #luz {
        opacity: 1;
    }
`;
