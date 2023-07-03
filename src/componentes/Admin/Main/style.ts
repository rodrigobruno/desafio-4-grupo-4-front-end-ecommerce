import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export const ContainerMain = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
    margin-left: 68px;
    padding: 1rem 0 0 0;

    @media (min-width: 576px) {
        padding: 2rem 2rem 0 2rem;
    }

    @media (min-width: 768px) {
        padding: 3rem 3rem 0 3rem;
        margin-left: 250px;
    }
`;

export const ContainerS = styled(Container)`
    min-height: 100%;
`;
