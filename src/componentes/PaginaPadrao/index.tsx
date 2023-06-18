import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Topo from 'componentes/Topo';
import Rodape from 'componentes/Rodape';

export default function PaginaPadrao() {
    return (
        <>
            <Topo />
            <main className='main'>
                <Container fluid='xl' className='py-5'>
                    <Outlet />
                </Container>
            </main>
            <Rodape />
        </>
    );
}
