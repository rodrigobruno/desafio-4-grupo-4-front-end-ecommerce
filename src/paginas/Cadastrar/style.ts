import { Button, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Sombra from './images/sombra.webp';
import BgImage1 from './images/bg-cadastro-1.webp';

export const BgForm = styled(Col)`
    border-radius: 6px;
    background-color: var(--cor-preta-5);
    transition: all 0.4s ease-in-out;
`;

export const Background = styled.div`
    background-image: url(${Sombra}), url(${BgImage1});
    background-repeat: repeat no-repeat;
    background-size: 100%;
    background-position: top center;
`;

export const ButtonBlock = styled(Button)`
    margin-inline: auto;
    min-width: 50%;
`;
