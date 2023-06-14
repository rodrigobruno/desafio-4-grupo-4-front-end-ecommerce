export const precoFormatadoParaReal = (preco: number): string => {
    return preco.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    });
};

export const dataFormatadaParaDDMMYY = (data: string): string => {
    const dataISODataHora = new Date(data);
    return dataISODataHora.toLocaleString('pt-BR', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
    });
};
