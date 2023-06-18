import { Link } from 'react-router-dom';
import { ReactComponent as LogoGamaZoneAdmin } from 'assets/logo-gama-zone-admin.svg';
import { ReactComponent as LogoGamaZoneAdminIcon } from 'assets/logo-gama-zone-peca.svg';
import { Logo, LogoIcon } from './style';

interface Props {
    active: boolean;
}

export default function TopoAdmin({ active }: Props) {
    return (
        <header>
            <Link to='/'>
                <Logo active={active}>
                    <LogoGamaZoneAdmin className='img-fluid' />
                </Logo>
                <LogoIcon active={active}>
                    <LogoGamaZoneAdminIcon className='img-fluid' />
                </LogoIcon>
            </Link>
        </header>
    );
}
