import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export default function PaginaAdmin() {
    return (
        <main>
            <Container fluid='xl' className='py-5'>
                <Outlet />
            </Container>
        </main>
    );
}
