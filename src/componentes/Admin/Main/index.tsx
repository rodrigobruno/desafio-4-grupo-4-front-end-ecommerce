import { Outlet } from 'react-router-dom';
import RodapeAdmin from '../Rodape';
import { ContainerMain } from './style';
import { Container } from 'react-bootstrap';

export default function MainAdmin() {
    return (
        <ContainerMain>
            <main className='main-admin'>
                <Container fluid={true}>
                    <Outlet />
                </Container>
            </main>
            <RodapeAdmin />
        </ContainerMain>
    );
}
