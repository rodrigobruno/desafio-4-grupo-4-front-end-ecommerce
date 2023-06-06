import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from 'lib/axios';
import { CardProdutoProps } from 'types/';
import Spinner from 'react-bootstrap/Spinner';
import CardProduto from 'componentes/CardProduto';
import CardsProdutos from 'componentes/CardsProdutos';

export default function Inicio() {
    const [produtos, setProdutos] = useState<CardProdutoProps[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    console.log(produtos);

    useEffect(() => {
        const pegarProdutos = async () => {
            try {
                const response = await api.get('/');
                setProdutos(response.data);
            } catch (error) {
                //alert('Erro na requisição');
            } finally {
                setIsInitialLoading(false);
            }
        };

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
                {isInitialLoading && (
                    <div className='w-100 d-flex justify-content-center'>
                        <Spinner animation='border' variant='primary' />
                    </div>
                )}
                {produtos.map((produto) => (
                    <CardProduto
                        key={produto.id}
                        title={produto.title}
                        price={produto.price}
                        image={produto.image}
                    />
                ))}
            </CardsProdutos>
        </>
    );
}
