import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks';

export default function PaginaAdmin() {
    const ehAdmin = useAppSelector((state) => state?.isAdmin === true);

    console.log(ehAdmin);

    if (!ehAdmin) {
        return <Navigate to='/entrar' replace />;
    }

    return (
        <main>
            <Container fluid='xl' className='py-5'>
                <Outlet />
            </Container>
        </main>
    );
}
