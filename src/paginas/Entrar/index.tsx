import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from 'lib/axios';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import { useAppDispatch } from 'hooks';
import { login } from 'store/modules/usuario';
import { LoginResponse } from 'types';

export default function Entrar() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('equipe4');
    const [email, setEmail] = useState('equipe4@gmail.com');
    const [password, setPassword] = useState('equipe4');

    const lidarComEnvio = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const responseData: LoginResponse = await api.post(
                '/auth/login',
                {
                    username: username,
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        Prefer: 'code=200, example=Usuário admin logado',
                        //Prefer: 'code=200, example=Usuário logado',
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }
            );

            console.log(responseData.data);
            dispatch(login(responseData.data));
        } catch (error) {
            alert('Erro na requisição');
        }
    };

    return (
        <>
            <Helmet>
                <title>Entrar - Gama Zone</title>
                <meta
                    name='description'
                    content='Faça login na nossa loja de board games e tenha acesso a vantagens exclusivas, histórico de compras e uma experiência personalizada. Junte-se a nós agora!'
                />
            </Helmet>

            <h1>Entrar</h1>

            <Form onSubmit={lidarComEnvio}>
                <Form.Group className='mb-3' controlId='formLoginUsername'>
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Digite o seu usuário'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formLoginEmail'>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Digite o seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formLoginSenha'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Entrar
                </Button>
            </Form>
        </>
    );
}
