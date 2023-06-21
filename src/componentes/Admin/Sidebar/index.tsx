import { useState } from 'react';
import { ArrowBarLeft, ArrowBarRight } from 'react-bootstrap-icons';
import { Scrollbar } from 'componentes/Scrollbar';
import MenuAdmin from '../Menu';
import TopoAdmin from '../Topo';
import { Sidebar, Abrir, Overlay } from './style';

export default function SidebarAdmin() {
    const [abrirMenu, setAbrirMenu] = useState(false);
    const lidarComAbrirMenu = () => setAbrirMenu(true);
    const lidarComFecharMenu = () => setAbrirMenu(false);

    return (
        <>
            <Scrollbar visibilidade={abrirMenu} />
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
            <Overlay active={abrirMenu} onClick={lidarComFecharMenu} />
        </>
    );
}
