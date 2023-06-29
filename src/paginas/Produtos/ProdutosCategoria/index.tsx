import { Helmet } from 'react-helmet-async';
import CardsProdutos from 'componentes/CardsProdutos';
import { useParams } from 'react-router-dom';
import NaoEncontrada from 'paginas/NaoEncontrada';
import { Col } from 'react-bootstrap';
import { TituloSecoes } from './style';
import { useEffect, useState } from 'react';
import { Categorias } from 'types';
import { api } from 'lib/axios';
import CarregandoPagina from 'componentes/CarregandoPagina';

export default function ProdutosCategoria() {
    const { id } = useParams();

    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const [listaDeCategorias, setListaDeCategorias] = useState<Categorias[]>(
        []
    );

    useEffect(() => {
        const pegarCategorias = async () => {
            setEstaCarregando(true);
            setOcorreuErroNaRespostaApi(false);

            try {
                const resposta = await api.get(`/categories/?page=1&limit=100`);
                setListaDeCategorias(resposta.data.categories);
            } catch (error) {
                setOcorreuErroNaRespostaApi(true);
            } finally {
                setEstaCarregando(false);
            }
        };
        pegarCategorias();
    }, [id]);

    if (!id) {
        return <NaoEncontrada />;
    }

    return (
        <>
            <Helmet>
                <title>Nossos produtos - Gama Zone</title>
                <meta
                    name='description'
                    content='Encontre os melhores board games na nossa loja online. Uma variedade incrível de jogos de tabuleiro para todos os gostos. Compre agora e mergulhe na diversão!'
                />
            </Helmet>

            {(!ocorreuErroNaRespostaApi || listaDeCategorias.length > 0) && (
                <Col className='mt-2'>
                    <TituloSecoes>
                        {listaDeCategorias
                            .filter((categoria) => categoria._id === id)
                            .map((titulo) => titulo.title)
                            .toString()}
                    </TituloSecoes>
                </Col>
            )}

            <CardsProdutos categoria={id} verMais={false} />

            <CarregandoPagina visibilidade={estaCarregando} />
        </>
    );
}
