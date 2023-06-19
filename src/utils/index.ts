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

export const ehUmaUrlValida = (url: string): boolean => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    return pattern.test(url);
};
