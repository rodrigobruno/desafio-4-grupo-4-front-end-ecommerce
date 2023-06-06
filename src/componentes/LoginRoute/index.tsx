import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { ReactNode } from 'react';

interface LoginRouteProps {
    children: ReactNode;
}

export const LoginRoute = ({ children }: LoginRouteProps) => {
    const usuario = useAppSelector((state) => state._id);

    if (usuario) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
};
