import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import { ReactNode } from 'react';

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const usuario = useAppSelector((state) => state._id);

    if (!usuario) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
};
