import styled from 'styled-components';

export const Header = styled.header`
    & .nav-link.active:not(#menu-carrinho .nav-link) {
        padding-bottom: calc(var(--bs-nav-link-padding-y) - 3px);

        &::after {
            content: '';
            border-bottom: 3px solid var(--cor-verde-1);
            width: auto;
            display: block;
        }
    }

    & #menu-carrinho {
        order: 0;
    }

    & #menu-carrinho .badge {
        transform: translate(-20%, 120%);
    }

    @media (min-width: 767.98px) {
        & #menu-carrinho {
            order: 1;
        }
    }
`;
