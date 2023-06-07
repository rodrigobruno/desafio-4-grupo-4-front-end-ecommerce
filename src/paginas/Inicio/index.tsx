import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { api } from 'lib/axios';
import { CardProdutoProps } from 'types/';
import CardProduto from 'componentes/CardProduto';
import CardsProdutos from 'componentes/CardsProdutos';
import { Dice5Fill, EmojiFrown, PlusCircle } from 'react-bootstrap-icons';

export default function Inicio() {
    const [produtos, setProdutos] = useState<CardProdutoProps[]>([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);
    const navigate = useNavigate();

    const pegarProdutos = async () => {
        try {
            const resposta = await api.get('/products');
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
                <title>Gama Zone</title>
                <meta
                    name='description'
                    content='A Gama Zone loja especializada em board games que oferece uma experiência única para entusiastas de jogos de tabuleiro. Possui uma ampla variedade de títulos.'
                />
            </Helmet>
            <CardsProdutos>
                {estaCarregando && !ocorreuErroNaRespostaApi && (
                    <div className='w-100 d-flex justify-content-center'>
                        <Spinner animation='border' variant='primary' />
                    </div>
                )}

                {ocorreuErroNaRespostaApi && (
                    <div className='w-100 d-flex justify-content-center'>
                        <Alert key='erro-api-inicio' variant='primary'>
                            Algo deu errado <EmojiFrown className='ms-1 me-3' />{' '}
                            <Button
                                className='d-inline-flex align-items-center'
                                onClick={() => navigate(0)}
                            >
                                <Dice5Fill className='me-2' />
                                Jogue o dado novamente
                            </Button>
                        </Alert>
                    </div>
                )}

                {!ocorreuErroNaRespostaApi &&
                    produtos
                        .slice(0, 3)
                        .map((produto) => (
                            <CardProduto
                                key={produto.id}
                                title={produto.title}
                                price={produto.price}
                                img={produto.img}
                            />
                        ))}
            </CardsProdutos>

            {produtos.length > 3 && !ocorreuErroNaRespostaApi && (
                <div className='d-flex justify-content-center my-5'>
                    <LinkContainer to={'produtos'}>
                        <Button
                            variant='secondary'
                            size='lg'
                            as='a'
                            className='d-flex align-items-center'
                        >
                            <PlusCircle className='me-3' />
                            Ver mais produtos
                        </Button>
                    </LinkContainer>
                </div>
            )}
        </>
    );
}
