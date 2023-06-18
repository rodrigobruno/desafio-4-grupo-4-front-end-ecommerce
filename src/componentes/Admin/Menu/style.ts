import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
    active: boolean;
}

export const NavUl = styled.ul`
    list-style: none;
    margin-left: 0;
    padding-left: 0;
`;

export const NavLi = styled.li`
    display: flex;
    flex-direction: column;
    padding-block: 0.75rem;
`;

export const NavLinkMenu = styled(NavLink)`
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    text-decoration: none;
    font-weight: var(--font-weight-light);
    transition: all 0.15s ease-in-out;
    text-transform: uppercase;
    font-size: 1.25rem;

    &:hover {
        color: rgba(255, 255, 255, 0.75);
    }

    &.active {
        color: var(--cor-preta-1);
        & + a {
            display: block;
        }
    }
`;

export const SubNavLinkMenu = styled(NavLinkMenu)`
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-left: 1.3rem;
    display: none;

    &.active {
        display: block;
    }
`;

export const NavLabel = styled.span<Props>`
    display: none;
    margin-left: 0;

    @media (min-width: 768px) {
        display: inline-block;
        margin-left: 0.5rem;
    }

    ${({ active }) =>
        !active
            ? `display: none; margin-left: 0;
            `
            : `margin-left: 0.5rem; display:inline-block;`}
`;
