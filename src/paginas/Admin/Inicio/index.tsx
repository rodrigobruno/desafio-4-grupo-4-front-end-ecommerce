import { Helmet } from 'react-helmet-async';
import { Row, Col, Button, Stack } from 'react-bootstrap';
import { useAppSelector } from 'hooks';
import { Archive, CardText, PersonSquare, Tags } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from 'lib/axios';
import CarregandoPagina from 'componentes/CarregandoPagina';
import { Coluna, Numero, NumeroContent, Titulo } from './style';

export default function AdminInicio() {
    const navigate = useNavigate();
    const nome = useAppSelector((state) => state.authSlice.nameid) || '';
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [itensTotaisPedidos, setItensTotaisPedidos] = useState(0);
    const [itensTotaisProdutos, setItensTotaisProdutos] = useState(0);
    const [itensTotaisUsuarios, setItensTotaisUsuarios] = useState(0);
    const [itensTotaisCategorias, setItensTotaisCategorias] = useState(0);

    useEffect(() => {
        const pegarInfos = async () => {
            setEstaCarregando(true);

            try {
                const pedidos = await api.get('/orders/', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });

                const produtos = await api.get('/products/', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });

                const usuarios = await api.get('/users/', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });

                const categorias = await api.get('/categories/', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                });

                setItensTotaisPedidos(Number(pedidos.data.totalItems));
                setItensTotaisProdutos(Number(produtos.data.totalItems));
                setItensTotaisUsuarios(Number(usuarios.data.totalItems));
                setItensTotaisCategorias(Number(categorias.data.totalItems));
            } catch (error) {
                setItensTotaisPedidos(0);
                setItensTotaisProdutos(0);
                setItensTotaisUsuarios(0);
                setItensTotaisCategorias(0);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarInfos();
    }, [accessToken]);

    return (
        <>
            <Helmet>
                <title>Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-5 text-uppercase'>Bem vindo {nome}</h1>
                </Col>
            </Row>

            <Row xs={1} sm={1} md={1} lg={2} xl={4} xxl={4}>
                <Coluna>
                    <Stack gap={3}>
                        <Numero>
                            <NumeroContent>{itensTotaisPedidos}</NumeroContent>
                        </Numero>
                        <Titulo>
                            <CardText className='me-2 bi' /> Pedidos
                        </Titulo>
                        <Button onClick={() => navigate('/admin/pedidos')}>
                            Ver pedidos
                        </Button>
                    </Stack>
                </Coluna>

                <Coluna>
                    <Stack gap={3}>
                        <Numero>
                            <NumeroContent>{itensTotaisProdutos}</NumeroContent>
                        </Numero>
                        <Titulo>
                            <Archive className='me-2 bi' /> Produtos
                        </Titulo>

                        <Button onClick={() => navigate('/admin/produtos')}>
                            Ver produtos
                        </Button>

                        <Button
                            variant='outline-primary'
                            onClick={() => navigate('/admin/produtos/criar')}
                        >
                            Criar produto
                        </Button>
                    </Stack>
                </Coluna>

                <Coluna>
                    <Stack gap={3}>
                        <Numero>
                            <NumeroContent>{itensTotaisUsuarios}</NumeroContent>
                        </Numero>
                        <Titulo>
                            <PersonSquare className='me-2 bi' /> Usuários
                        </Titulo>

                        <Button onClick={() => navigate('/admin/usuarios')}>
                            Ver usuários
                        </Button>

                        <Button
                            variant='outline-primary'
                            onClick={() => navigate('/admin/usuarios/criar')}
                        >
                            Criar usuário
                        </Button>
                    </Stack>
                </Coluna>

                <Coluna>
                    <Stack gap={3}>
                        <Numero>
                            <NumeroContent>
                                {itensTotaisCategorias}
                            </NumeroContent>
                        </Numero>
                        <Titulo>
                            <Tags className='me-2 bi' /> Categorias
                        </Titulo>

                        <Button onClick={() => navigate('/admin/categorias')}>
                            Ver categorias
                        </Button>

                        <Button
                            variant='outline-primary'
                            onClick={() => navigate('/admin/categorias/criar')}
                        >
                            Criar categoria
                        </Button>
                    </Stack>
                </Coluna>
            </Row>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
