import { Outlet } from 'react-router-dom';
import Topo from 'componentes/Topo';
import Rodape from 'componentes/Rodape';

export default function PaginaInicio() {
    return (
        <>
            <Topo />
            <main className='main'>
                <Outlet />
            </main>
            <Rodape />
        </>
    );
}
