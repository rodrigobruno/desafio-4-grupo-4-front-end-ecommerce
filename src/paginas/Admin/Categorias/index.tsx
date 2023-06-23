import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from 'lib/axios';
import { Col, Row, Stack } from 'react-bootstrap';
import { Categorias } from 'types';
import CardCategoriaAdmin from 'componentes/Admin/CardCategoria';
import { Link } from 'react-router-dom';
import CarregandoPagina from 'componentes/CarregandoPagina';
import Paginacao from 'componentes/Paginacao';

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState<Categorias[]>([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [paginasTotais, setPaginasTotais] = useState(0);
    const [itensTotais, setItensTotais] = useState(0);
    const [limite] = useState(2);

    const lidarComAPaginaAtual = (pagina: number) => {
        setPaginaAtual(pagina);
    };

    const pegarCategorias = useCallback(async () => {
        setOcorreuErroNaRespostaApi(false);

        try {
            const resposta = await api.get(
                `/categories/?page=${paginaAtual}&limit=${limite}`
            );
            setCategorias(resposta.data.categories);
            setPaginaAtual(Number(resposta.data.currentPage));
            setItensTotais(Number(resposta.data.totalItems));
            setPaginasTotais(Number(resposta.data.totalPages));
            setOcorreuErroNaRespostaApi(false);
        } catch (error) {
            setOcorreuErroNaRespostaApi(true);
        } finally {
            setEstaCarregando(false);
        }
    }, [limite, paginaAtual]);

    useEffect(() => {
        pegarCategorias();
    }, [pegarCategorias]);

    return (
        <>
            <Helmet>
                <title>Categorias - Painel de administração - Gama Zone</title>
                <meta
                    name='description'
                    content='Simplifique a gestão da sua loja de board games com nosso painel de administração. Controle estoque, pedidos e clientes de forma eficiente. Sucesso garantido!'
                />
            </Helmet>

            <Row>
                <Col>
                    <h1 className='mb-4 text-uppercase'>Categorias</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Stack gap={4}>
                        {categorias.map((categoria) => (
                            <CardCategoriaAdmin
                                key={categoria._id}
                                id={categoria._id}
                                nome={categoria.title}
                                pegarCategorias={pegarCategorias}
                            />
                        ))}

                        {categorias.length === 0 &&
                            !ocorreuErroNaRespostaApi && (
                                <p>
                                    Nenhuma categoria cadastrada.{' '}
                                    <Link to='/admin/categorias/criar'>
                                        Criar nova categoria
                                    </Link>
                                </p>
                            )}
                    </Stack>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Paginacao
                        paginaAtual={paginaAtual}
                        paginasTotais={paginasTotais}
                        itensTotais={itensTotais}
                        limite={limite}
                        mudarDePagina={lidarComAPaginaAtual}
                    />
                </Col>
            </Row>

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
