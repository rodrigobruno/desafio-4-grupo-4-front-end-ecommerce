import Topo from 'componentes/Topo';
import { Outlet } from 'react-router-dom';

export default function PaginaSemRodape() {
    return (
        <>
            <Topo />
            <main className='main'>
                <Outlet />
            </main>
        </>
    );
}
