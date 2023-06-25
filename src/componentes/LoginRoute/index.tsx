import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { ReactNode } from 'react';

interface LoginRouteProps {
    children: ReactNode;
}

export const LoginRoute = ({ children }: LoginRouteProps) => {
    const usuario = useAppSelector((state) => state.authSlice._id);
    const { search } = useLocation();
    const queryOrigem = new URLSearchParams(search).get('origem');
    const origemCarrinho = queryOrigem === 'carrinho';

    if (!usuario) {
        return <>{children}</>;
    }

    if (origemCarrinho) {
        return <Navigate to='/carrinho' />;
    }

    return <Navigate to='/' />;
};
