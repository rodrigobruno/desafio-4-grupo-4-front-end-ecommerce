import { useAppDispatch, useAppSelector } from 'hooks';
import { NavLink } from 'react-router-dom';
import { logout } from 'store/modules/usuario';
import Nav from 'react-bootstrap/Nav';

export default function MenuLogado() {
    const ehAdmin = useAppSelector((state) => state?.isAdmin === true);
    const dispatch = useAppDispatch();

    return (
        <div className='d-flex flex-lg-row flex-column gap-3'>
            <NavLink to='/pedido' className={'nav-link'}>
                Seus pedidos
            </NavLink>

            <NavLink to='/perfil' className={'nav-link'}>
                Seus dados
            </NavLink>

            {ehAdmin && (
                <NavLink to='/admin' className={'nav-link'}>
                    Painel
                    <span className='d-lg-none d-xl-none d-inline-block d-xxl-inline-block'>
                        &ensp;Administrativo
                    </span>
                </NavLink>
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
