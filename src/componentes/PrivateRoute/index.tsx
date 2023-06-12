import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { ReactNode } from 'react';

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const usuario = useAppSelector((state) => state._id);
    const carregando = useAppSelector((state) => state.carregando);

    if (!usuario && !carregando) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
};
