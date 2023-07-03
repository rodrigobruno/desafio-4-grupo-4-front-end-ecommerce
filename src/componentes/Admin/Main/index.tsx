import { Outlet } from 'react-router-dom';
import RodapeAdmin from '../Rodape';
import { ContainerMain, ContainerS } from './style';

export default function MainAdmin() {
    return (
        <ContainerMain>
            <main className='main-admin'>
                <ContainerS fluid={true} className='h-100'>
                    <Outlet />
                </ContainerS>
            </main>
            <RodapeAdmin />
        </ContainerMain>
    );
}
