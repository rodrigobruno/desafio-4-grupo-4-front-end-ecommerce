import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './hooks';
import { setUsuario, carregado } from './store/modules/usuario';

import { api } from './lib/axios';
import { AxiosError } from 'axios';

import { LoginResponse } from 'types';
import AppRoutes from 'Router';
import CarregandoPagina from 'componentes/CarregandoPagina';

export default function App() {
    const dispatch = useAppDispatch();
    const { _id, accessToken, carregando } = useAppSelector((state) => state);

    useEffect(() => {
        if (accessToken) {
            api.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

            if (!_id) {
                (async () => {
                    try {
                        const responseData: LoginResponse = await api.get(
                            '/auth/user/',
                            {
                                headers: {
                                    Prefer: 'code=200, example=200',
                                    //Prefer: 'code=200, example=200 admin',
                                    Accept: 'application/json',
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );

                        dispatch(setUsuario(responseData.data));
                    } catch (error) {
                        const err = error as AxiosError;
                        if (err.response) {
                            if (err.response.status === 500)
                                return alert('Erro 500');
                        } else if (err.request) {
                            console.log(err.request);
                        } else {
                            console.log(err.message);
                        }
                    } finally {
                        dispatch(carregado());
                    }
                })();
            }
        }
    }, [_id, accessToken, dispatch]);

    return (
        <>
            <CarregandoPagina visibilidade={carregando} />
            <AppRoutes />
        </>
    );
}
