import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks';
import { Container } from './style';
import MainAdmin from 'componentes/Admin/Main';
import SidebarAdmin from 'componentes/Admin/Sidebar';

export default function PaginaAdmin() {
    const ehAdmin = useAppSelector(
        (state) => state?.authSlice.isAdmin === true
    );
    const carregando = useAppSelector((state) => state.authSlice.carregando);

    if (!ehAdmin && !carregando) {
        return <Navigate to='/entrar' replace />;
    }

    return (
        <Container>
            <SidebarAdmin />
            <MainAdmin />
        </Container>
    );
}
