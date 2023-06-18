import { useState } from 'react';
import { ArrowBarLeft, ArrowBarRight } from 'react-bootstrap-icons';
import MenuAdmin from '../Menu';
import TopoAdmin from '../Topo';
import { Sidebar, Abrir } from './style';

export default function SidebarAdmin() {
    const [abrirMenu, setAbrirMenu] = useState(false);
    const lidarComAbrirMenu = () => setAbrirMenu(true);
    const lidarComFecharMenu = () => setAbrirMenu(false);

    return (
        <>
            <Sidebar active={abrirMenu}>
                <Abrir>
                    {abrirMenu ? (
                        <ArrowBarLeft onClick={lidarComFecharMenu} />
                    ) : (
                        <ArrowBarRight onClick={lidarComAbrirMenu} />
                    )}
                </Abrir>
                <TopoAdmin active={abrirMenu} />
                <MenuAdmin active={abrirMenu} />
            </Sidebar>
        </>
    );
}
