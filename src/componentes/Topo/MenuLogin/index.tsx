import { NavLink } from 'react-router-dom';

export default function MenuLogin() {
    return (
        <div className='d-flex flex-lg-row flex-column gap-3'>
            <NavLink to='/entrar' className={'nav-link'}>
                Entrar
            </NavLink>

            <NavLink to='/cadastrar' className={'nav-link'}>
                Cadastrar
            </NavLink>
        </div>
    );
}
