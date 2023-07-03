import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavLinkS } from '../style';

export default function MenuLogin() {
    const navigate = useNavigate();

    return (
        <div className='d-flex flex-lg-row flex-column gap-3'>
            <NavLinkS to='/cadastrar' className='nav-link'>
                Cadastrar
            </NavLinkS>

            <Button
                variant='outline-primary'
                onClick={() => navigate('/entrar')}
            >
                Entrar
            </Button>
        </div>
    );
}
