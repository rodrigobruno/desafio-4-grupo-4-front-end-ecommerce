import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from 'lib/axios';
import { Col, Row, Stack } from 'react-bootstrap';
import { Categorias } from 'types';
import CardCategoriaAdmin from 'componentes/Admin/CardCategoria';
import { Link } from 'react-router-dom';
import CarregandoPagina from 'componentes/CarregandoPagina';

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState<Categorias[]>([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);

    const pegarCategorias = async () => {
        setOcorreuErroNaRespostaApi(false);

        try {
            const resposta = await api.get(`/categories`);
            setCategorias(resposta.data);
        } catch (error) {
            setOcorreuErroNaRespostaApi(true);
        } finally {
            setEstaCarregando(false);
        }
    };

    useEffect(() => {
        pegarCategorias();
    }, []);

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

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
