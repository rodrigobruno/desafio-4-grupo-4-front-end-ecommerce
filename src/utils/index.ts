export const precoFormatadoParaReal = (preco: number): string => {
    if (preco === undefined || preco === null) {
        return 'R$ -';
    }

    return preco.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    });
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
        '^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    return pattern.test(url);
};

export const anoAtual = (): number => {
    const dataDeHoje = new Date();
    const anoAtual = dataDeHoje.getFullYear();
    return anoAtual;
};

export const lidarComPlaceholder = (img = '') => {
    const url = img.split('.webp');
    const novaUrl = `${url[0]}-placeholder.webp`;
    return novaUrl;
};
