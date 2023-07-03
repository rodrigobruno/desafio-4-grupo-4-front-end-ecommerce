import styled from 'styled-components';

export const PageContainer = styled.div`
    margin-bottom: 5rem;
`;

export const ProdutoContainer = styled.div`
    margin-bottom: 3rem;
`;

export const StickyTop = styled.div`
    position: sticky;
    z-index: 1020;
    top: 1.5rem;
`;

export const InformcoesDoProduto = styled.div`
    display: grid;
    background-color: var(--cor-preta-5);
    border-radius: 6px;
    padding: 1rem;
    gap: 2rem;

    @media (min-width: 425px) {
        gap: 3.5rem;
        padding: 2.5rem;
    }
`;

export const Titulo = styled.h1`
    font-size: 2rem;
    text-transform: uppercase;
    line-height: 100%;
    margin: 0;
    hyphens: auto;

    @media (min-width: 425px) {
        font-size: 3rem;
    }

    @media (min-width: 992px) {
        font-size: 4rem;
    }
`;

export const ImagemContainer = styled.div`
    padding-inline: 2rem;
    padding-bottom: 2rem;

    @media (min-width: 992px) {
        padding-inline: 5rem;
    }
`;

export const Preco = styled.span`
    font-size: 1.25rem;
`;

export const Descricao = styled.div`
    font-size: 1.2rem;
    & p {
        font-size: 1.2rem;
    }
`;
