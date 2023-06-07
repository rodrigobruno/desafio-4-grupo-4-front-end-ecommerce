import { Button, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Sombra from './images/sombra.png';
import BgImage1 from './images/bg-login-1.jpg';

export const BgForm = styled(Col)`
    background-color: var(--cor-preta-5);
    border-radius: 6px;
    transition: all 0.4s ease-in-out;
`;

export const Background = styled.div`
    background-image: url(${Sombra}), url(${BgImage1});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

export const ButtonBlock = styled(Button)`
    margin-inline: auto;
    min-width: 50%;
`;
