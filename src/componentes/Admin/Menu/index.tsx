import {
    Archive,
    BoxArrowLeft,
    CardText,
    CashStack,
    House,
    PersonSquare,
    Tags,
} from 'react-bootstrap-icons';
import {
    NavUl,
    NavLi,
    NavLinkMenu,
    NavButtonMenu,
    SubNavLinkMenu,
    NavLabel,
} from './style';
import { useAppDispatch } from 'hooks';
import { logout } from 'store/modules/usuario';

interface Props {
    active: boolean;
}

export default function MenuAdmin({ active }: Props) {
    const dispatch = useAppDispatch();
    return (
        <nav>
            <NavUl>
                <NavLi>
                    <NavLinkMenu to='/admin/'>
                        <House className='bi' />
                        <NavLabel active={active}>Inicio</NavLabel>
                    </NavLinkMenu>
                </NavLi>

                <NavLi>
                    <NavLinkMenu to='/admin/pedidos'>
                        <CardText className='bi' />
                        <NavLabel active={active}>Pedidos</NavLabel>
                    </NavLinkMenu>
                </NavLi>

                <NavLi>
                    <NavLinkMenu to='/admin/produtos'>
                        <Archive className='bi' />
                        <NavLabel active={active}>Produtos</NavLabel>
                    </NavLinkMenu>
                    <SubNavLinkMenu to='/admin/produtos/criar'>
                        <NavLabel active={active}>Criar produto</NavLabel>
                    </SubNavLinkMenu>
                </NavLi>

                <NavLi>
                    <NavLinkMenu to='/admin/usuarios'>
                        <PersonSquare className='bi' />
                        <NavLabel active={active}>Usuários</NavLabel>
                    </NavLinkMenu>
                    <SubNavLinkMenu to='/admin/usuarios/criar'>
                        <NavLabel active={active}>Criar usuário</NavLabel>
                    </SubNavLinkMenu>
                </NavLi>

                <NavLi>
                    <NavLinkMenu to='/admin/categorias'>
                        <Tags className='bi' />
                        <NavLabel active={active}>Categorias</NavLabel>
                    </NavLinkMenu>
                    <SubNavLinkMenu to='/admin/categorias/criar'>
                        <NavLabel active={active}>Criar categoria</NavLabel>
                    </SubNavLinkMenu>
                </NavLi>

                <NavLi>
                    <NavLinkMenu to='/admin/cupons'>
                        <CashStack className='bi' />
                        <NavLabel active={active}>Cupons</NavLabel>
                    </NavLinkMenu>
                    <SubNavLinkMenu to='/admin/cupons/criar'>
                        <NavLabel active={active}>Criar Cupon</NavLabel>
                    </SubNavLinkMenu>
                </NavLi>
                <NavLi>
                    <NavButtonMenu onClick={() => dispatch(logout())}>
                        <BoxArrowLeft className='bi' />
                        <NavLabel active={active}>Sair</NavLabel>
                    </NavButtonMenu>
                </NavLi>
            </NavUl>
        </nav>
    );
}
