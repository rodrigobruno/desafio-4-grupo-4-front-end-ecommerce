import { Outlet } from 'react-router-dom';
import RodapeAdmin from '../Rodape';
import { ContainerMain } from './style';
import { Col, Container, Row } from 'react-bootstrap';

export default function MainAdmin() {
    return (
        <ContainerMain>
            <main className='main-admin'>
                <Container>
                    <Row>
                        <Col>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </main>
            <RodapeAdmin />
        </ContainerMain>
    );
}
