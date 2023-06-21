import { Helmet } from 'react-helmet-async';
import { Col, Row, Stack } from 'react-bootstrap';
import CardProdutoAdmin from 'componentes/Admin/CardProduto';
import { useEffect, useState } from 'react';
import { api } from 'lib/axios';
import CarregandoPagina from 'componentes/CarregandoPagina';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import { Link } from 'react-router-dom';
import { Produto } from 'types';

export default function AdminProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);

    const pegarProdutos = async () => {
        setOcorreuErroNaRespostaApi(false);

        try {
            const resposta = await api.get(`/products`);
            setProdutos(resposta.data);
        } catch (error) {
            setOcorreuErroNaRespostaApi(true);
        } finally {
            setEstaCarregando(false);
        }
    };

    useEffect(() => {
        pegarProdutos();
    }, []);
    return (
        <>
            <Helmet>
                <title>Produtos - Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>
                        Produtos cadastrados
                    </h1>
                </Col>
            </Row>

            {ocorreuErroNaRespostaApi && (
                <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
            )}

            <Row>
                <Col>
                    <Stack gap={4}>
                        {produtos.map((produto) => (
                            <CardProdutoAdmin
                                key={produto._id}
                                numero={produto._id}
                                imagem={produto.img}
                                nome={produto.title}
                                preco={produto.price}
                                pegarProdutos={pegarProdutos}
                            />
                        ))}
                        {produtos.length === 0 && !ocorreuErroNaRespostaApi && (
                            <p>
                                Nenhum produto cadastrado.{' '}
                                <Link to='/admin/produtos/criar'>
                                    Criar novo produto
                                </Link>
                            </p>
                        )}
                    </Stack>
                </Col>
            </Row>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
