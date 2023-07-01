import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function MenuLogin() {
    const navigate = useNavigate();

    return (
        <div className='d-flex flex-lg-row flex-column gap-3'>
            <NavLink to='/cadastrar' className='nav-link'>
                Cadastrar
            </NavLink>

            <Button
                variant='outline-primary'
                onClick={() => navigate('/entrar')}
            >
                Entrar
            </Button>
        </div>
    );
}
