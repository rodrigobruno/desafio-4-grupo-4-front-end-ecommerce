import { ReactNode } from 'react';
import { useAppDispatch } from 'hooks';
import { logout } from 'store/modules/usuario';
import { api } from 'lib/axios';

interface Props {
    children: ReactNode;
}

export const TokenValido = ({ children }: Props) => {
    const dispatch = useAppDispatch();

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                return dispatch(logout());
            }
            return Promise.reject(error);
        }
    );

    return <>{children}</>;
};
