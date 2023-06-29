import { Button, Col } from 'react-bootstrap';
import styled from 'styled-components';

export const BgForm = styled(Col)`
    border-radius: 6px;
    background-color: var(--cor-preta-5);
    transition: all 0.4s ease-in-out;
`;

export const ButtonBlock = styled(Button)`
    margin-inline: auto;
    min-width: 50%;
`;
