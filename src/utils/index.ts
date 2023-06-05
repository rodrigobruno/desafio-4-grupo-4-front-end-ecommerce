export const precoFormatadoParaReal = (preco: number): string => {
    return preco.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    });
};
