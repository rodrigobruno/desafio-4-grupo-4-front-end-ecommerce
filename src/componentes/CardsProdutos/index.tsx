import { useEffect, useState } from 'react';
import { api } from 'lib/axios';
import { CardProdutoProps } from 'types/';
import CardProduto from 'componentes/CardProduto';
import ErroAtualizarPagina from 'componentes/ErroAtualizarPagina';
import BotaoMais from 'componentes/BotaoMais';
import Carregando from 'componentes/Carregando';

type Props = {
    limite?: boolean;
    quantidade?: number;
};

export default function CardsProdutos({
    limite = false,
    quantidade = 3,
}: Props) {
    const [produtos, setProdutos] = useState<CardProdutoProps[]>([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [ocorreuErroNaRespostaApi, setOcorreuErroNaRespostaApi] =
        useState(false);

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

    const lacoProdutos = () => {
        return produtos.map((produto) => (
            <CardProduto
                key={produto._id}
                title={produto.title}
                price={produto.price}
                img={produto.img}
            />
        ));
    };

    return (
        <>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 g-4'>
                {estaCarregando && !ocorreuErroNaRespostaApi && (
                    <div className='w-100 d-flex justify-content-center'>
                        <Carregando
                            largura={2}
                            altura={2}
                            cor='var(--cor-preta-1)'
                        />
                    </div>
                )}

                {ocorreuErroNaRespostaApi && (
                    <ErroAtualizarPagina classes='w-100 d-flex justify-content-center' />
                )}

                {!ocorreuErroNaRespostaApi &&
                    (limite
                        ? lacoProdutos().slice(0, quantidade)
                        : lacoProdutos())}
            </div>

            {!ocorreuErroNaRespostaApi &&
                limite &&
                produtos.length > quantidade && (
                    <BotaoMais
                        classes='d-flex justify-content-center my-5'
                        para='produtos'
                        variacao='secondary'
                        tamanho='lg'
                    />
                )}
        </>
    );
}
