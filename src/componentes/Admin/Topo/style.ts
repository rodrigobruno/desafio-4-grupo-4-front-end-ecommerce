import styled from 'styled-components';

interface Props {
    active: boolean;
}

export const Logo = styled.div<Props>`
    margin-bottom: 2rem;
    ${({ active }) =>
        active
            ? `display: block`
            : `display: none;
               @media (min-width: 768px) {
                display: block
               }`}
`;

export const LogoIcon = styled.div<Props>`
    margin-block: 0.75rem;
    height: 30px;
    ${({ active }) =>
        active
            ? `display: none`
            : `display: block;
               @media (min-width: 768px) {
                display: none;
               }`}
`;
