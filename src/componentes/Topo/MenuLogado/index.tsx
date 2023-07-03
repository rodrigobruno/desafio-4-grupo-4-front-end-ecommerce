import { useAppDispatch, useAppSelector } from 'hooks';
import Nav from 'react-bootstrap/Nav';
import { logout } from 'store/modules/usuario';
import { NavLinkS } from '../style';

export default function MenuLogado() {
    const ehAdmin = useAppSelector(
        (state) => state?.authSlice.isAdmin === true
    );
    const dispatch = useAppDispatch();

    return (
        <div className='d-flex flex-lg-row flex-column gap-3'>
            <NavLinkS to='/pedidos' className='nav-link'>
                Seus pedidos
            </NavLinkS>

            <NavLinkS to='/perfil' className='nav-link'>
                Seus dados
            </NavLinkS>

            {ehAdmin && (
                <NavLinkS to='/admin' className='nav-link'>
                    Painel
                    <span className='d-lg-none d-xl-none d-inline-block d-xxl-inline-block'>
                        &ensp;Administrativo
                    </span>
                </NavLinkS>
            )}

            <Nav.Link
                onClick={() => dispatch(logout())}
                as='button'
                className='text-start text-uppercase'
            >
                Sair
            </Nav.Link>
        </div>
    );
}
