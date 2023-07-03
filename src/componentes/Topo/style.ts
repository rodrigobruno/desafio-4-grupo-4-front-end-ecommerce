import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavLinkS = styled(NavLink)`
    &.active {
        padding-bottom: calc(var(--bs-nav-link-padding-y) - 3px);

        &::after {
            content: '';
            border-bottom: 3px solid var(--cor-verde-1);
            width: auto;
            display: block;
        }
    }
`;

export const Header = styled.header`
    & #menu-carrinho {
        order: 0;
    }

    & #menu-carrinho .badge {
        transform: translate(-20%, 120%);
    }

    & #menu-carrinho:hover .badge {
        background-color: #64d858 !important;
    }

    @media (min-width: 992px) {
        & #menu-carrinho {
            order: 1;
        }
    }
`;
