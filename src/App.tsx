import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './hooks';
import { setUsuario, carregado } from './store/modules/usuario';

import { api } from './lib/axios';
import { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';

import { LoginResponse } from 'types';
import AppRoutes from 'Router';
import CarregandoPagina from 'componentes/CarregandoPagina';

interface RespostaDecode {
    id: string;
    exp: number;
}

export default function App() {
    const dispatch = useAppDispatch();
    const { _id, accessToken, carregando } = useAppSelector((state) => state);

    useEffect(() => {
        if (accessToken) {
            api.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

            const decoded: RespostaDecode = jwt_decode(accessToken);
            const id = decoded.id;

            if (!_id) {
                (async () => {
                    try {
                        const responseData: LoginResponse = await api.get(
                            `/users/${id}`,
                            {
                                headers: {
                                    Authorization: 'Bearer ' + accessToken,
                                },
                            }
                        );
                        dispatch(setUsuario(responseData.data));
                    } catch (error) {
                        const err = error as AxiosError;
                        if (err.response) {
                            if (err.response.status === 500)
                                console.log(err.request);
                            if (err.response.status === 401)
                                return console.log(err.response);
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
        } else {
            dispatch(carregado());
        }
    }, [_id, accessToken, dispatch]);

    return (
        <>
            <CarregandoPagina visibilidade={carregando} />
            <AppRoutes />
        </>
    );
}
