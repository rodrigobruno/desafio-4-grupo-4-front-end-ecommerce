import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import { api } from 'lib/axios';
import { useAppDispatch } from 'hooks';
import { login } from 'store/modules/usuario';
import { LoginResponse } from 'types';

interface CamposForm {
    username: string;
    email: string;
    password: string;
}

export default function Entrar() {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<CamposForm>({
        username: '',
        email: '',
        password: '',
    });

    const [erros, setErros] = useState<any>({
        username: null,
        email: null,
        password: null,
    });

    const lidarComAsMudancasNosCampos = (campo: string, valor: string) => {
        setForm({
            ...form,
            [campo]: valor,
        });

        if (!!erros[campo]) {
            setErros({
                ...erros,
                [campo]: null,
            });
        }
    };

    const validarForm = () => {
        const { username, email, password }: CamposForm = form;
        const novoErros = {} as CamposForm;

        const ehEmail = (email: string) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

        if (!username || username === '') {
            novoErros.username = 'Preencha o usuário';
        } else if (username.length < 3) {
            novoErros.username = 'O usuário deve ter mais do que 3 caracteres';
        }

        if (!email || email === '') {
            novoErros.email = 'Preencha o e-mail';
        } else if (!ehEmail(email)) {
            novoErros.email = 'E-mail inválido';
        }

        if (!password || password === '') {
            novoErros.password = 'Preencha a senha';
        }

        return novoErros;
    };

    const lidarComEnvio = async (e: FormEvent) => {
        e.preventDefault();

        const errosNoFormulario = validarForm();

        if (Object.keys(errosNoFormulario).length > 0) {
            setErros(errosNoFormulario);
        } else {
            try {
                const responseData: LoginResponse = await api.post(
                    '/auth/login',
                    {
                        username: form.username,
                        email: form.email,
                        password: form.password,
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
                dispatch(login(responseData.data));
            } catch (error) {
                console.log(error);
                alert('Erro na requisição PQ');
            }
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

            <Form noValidate onSubmit={lidarComEnvio}>
                <Form.Group className='mb-3' controlId='formLoginUsername'>
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Digite o seu usuário'
                        value={form.username}
                        onChange={(e) =>
                            lidarComAsMudancasNosCampos(
                                'username',
                                e.target.value
                            )
                        }
                        isInvalid={!!erros.username}
                        required
                    />
                    <Form.Control.Feedback type='valid'>
                        Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        {erros.username}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formLoginEmail'>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Digite o seu email'
                        value={form.email}
                        onChange={(e) =>
                            lidarComAsMudancasNosCampos('email', e.target.value)
                        }
                        isInvalid={!!erros.email}
                        required
                    />
                    <Form.Control.Feedback type='valid'>
                        Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        {erros.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formLoginSenha'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Digite sua senha'
                        value={form.password}
                        onChange={(e) =>
                            lidarComAsMudancasNosCampos(
                                'password',
                                e.target.value
                            )
                        }
                        isInvalid={!!erros.password}
                        required
                    />
                    <Form.Control.Feedback type='valid'>
                        Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                        {erros.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Entrar
                </Button>
            </Form>
        </>
    );
}
