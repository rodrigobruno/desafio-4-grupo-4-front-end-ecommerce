import { Col, Container, Row } from 'react-bootstrap';
import { Footer } from './style';
import { anoAtual } from 'utils';

export default function RodapeAdmin() {
    return (
        <Footer className='rodape-admin'>
            <Container fluid='xl'>
                <Row>
                    <Col>Copyright © {anoAtual()} Grupo 04. Versão 1.0</Col>
                </Row>
            </Container>
        </Footer>
    );
}
