export const precoFormatadoParaReal = (preco: number): string => {
    if (preco) {
        return preco.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    return 'R$ -';
};

export const dataFormatadaParaDDMMYY = (data: string): string => {
    if (data) {
        const dataISODataHora = new Date(data);
        return dataISODataHora.toLocaleString('pt-BR', {
            year: '2-digit',
            month: 'numeric',
            day: 'numeric',
        });
    }
    return '--/--/--';
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

export const anoAtual = (): number => {
    const dataDeHoje = new Date();
    const anoAtual = dataDeHoje.getFullYear();
    return anoAtual;
};
