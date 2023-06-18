import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Footer = styled.footer`
    color: var(--cor-preta-6);
    background-color: var(--cor-verde-3);

    & a {
        color: var(--cor-preta-6);
        text-decoration: none;
        transition: all 0.15s ease-in-out;
    }
`;

export const Ul = styled.ul`
    list-style-type: none;
    gap: 2rem;
`;

export const Titulo = styled.span`
    font-weight: var(--font-weight-preta);
    font-size: 1.5rem;
    text-transform: uppercase;
`;

export const NavLinkRodape = styled(NavLink)`
    padding-top: 0.5rem;
    margin-bottom: 2px;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    font-weight: var(--font-weight-bold);

    &:hover {
        border-bottom: 3px solid var(--cor-preta-6);
    }

    &.active {
        border-bottom: 3px solid var(--cor-preta-6);
    }
`;
