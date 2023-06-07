import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Topo from 'componentes/Topo';
import Rodape from 'componentes/Rodape';

export default function PaginaBackground() {
    return (
        <>
            <Topo />
            <main>
                <Outlet />
            </main>
            <Rodape />
        </>
    );
}
