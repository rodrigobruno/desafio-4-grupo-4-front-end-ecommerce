import { Pagination } from 'react-bootstrap';

type PaginationControlProps = {
    paginaAtual?: number;
    paginasTotais: number;
    entre?: number;
    itensTotais: number;
    limite: number;
    mudarDePagina?: (paginaAtual: number) => void;
    proximo?: boolean;
    ultimo?: boolean;
    ellipsis?: number;
};

export default function Paginacao({
    paginaAtual = 1,
    paginasTotais,
    entre = 1,
    itensTotais,
    limite,
    mudarDePagina = (paginaAtual) => console.log(paginaAtual),
    proximo = true,
    ultimo = true,
    ellipsis = 5,
}: PaginationControlProps) {
    //const paginasTotais = Math.ceil(itensTotais / limite);
    entre = entre < 1 ? 1 : entre;
    paginaAtual =
        paginaAtual < 1
            ? 1
            : paginaAtual > paginasTotais
            ? paginasTotais
            : paginaAtual;
    ellipsis = ellipsis < 1 ? 0 : ellipsis + 2 >= entre ? entre - 2 : ellipsis;

    let positions = Array.from({ length: paginasTotais }, (v, i) => {
        //v;
        return i;
    });

    const qtd_pages = entre * 2 + 1;
    const range =
        paginasTotais <= qtd_pages
            ? // Show active without slice
              positions
            : paginaAtual - 1 <= entre
            ? // Show active in left
              positions.slice(0, qtd_pages - (ellipsis > 0 ? ellipsis + 1 : 0))
            : paginaAtual + entre >= paginasTotais
            ? // Show active in right
              positions.slice(
                  paginasTotais - qtd_pages + (ellipsis > 0 ? ellipsis + 1 : 0),
                  paginasTotais
              )
            : // Show active in middle
              positions.slice(
                  paginaAtual - 1 - (entre - (ellipsis > 0 ? ellipsis + 1 : 0)),
                  paginaAtual + (entre - (ellipsis > 0 ? ellipsis + 1 : 0))
              );

    return itensTotais !== null && itensTotais > 0 && itensTotais > limite ? (
        <Pagination className='justify-content-center my-5'>
            {ultimo && (
                <Pagination.First
                    onClick={() => (paginaAtual > 1 ? mudarDePagina(1) : {})}
                    disabled={paginaAtual <= 1}
                />
            )}
            {ultimo && (
                <Pagination.Prev
                    onClick={() =>
                        paginaAtual > 1 ? mudarDePagina(paginaAtual - 1) : {}
                    }
                    disabled={paginaAtual <= 1}
                />
            )}
            {paginasTotais > entre * 2 + 1 &&
                ellipsis > 0 &&
                positions
                    .slice(0, paginaAtual - 1 <= entre ? 0 : ellipsis)
                    .map((value) => {
                        return (
                            <Pagination.Item
                                key={value}
                                onClick={() =>
                                    value !== paginaAtual - 1
                                        ? mudarDePagina(value + 1)
                                        : {}
                                }
                            >
                                {value + 1}
                            </Pagination.Item>
                        );
                    })}
            {
                // Show ellipsis when "page" is bigger than "between"
                paginasTotais > entre * 2 + 1 &&
                    ellipsis > 0 &&
                    paginaAtual - 1 > entre && <Pagination.Ellipsis disabled />
            }
            {range.map((value) => {
                return (
                    <Pagination.Item
                        active={value === paginaAtual - 1}
                        key={value}
                        onClick={() =>
                            value !== paginaAtual - 1
                                ? mudarDePagina(value + 1)
                                : {}
                        }
                    >
                        {value + 1}
                    </Pagination.Item>
                );
            })}
            {
                // Show ellipsis when "page" is lower than "between"
                paginasTotais > entre * 2 + 1 &&
                    ellipsis > 0 &&
                    paginaAtual < paginasTotais - entre && (
                        <Pagination.Ellipsis disabled />
                    )
            }
            {paginasTotais > entre * 2 + 1 &&
                ellipsis > 0 &&
                positions
                    .slice(
                        paginaAtual >= paginasTotais - entre
                            ? paginasTotais
                            : paginasTotais - ellipsis,
                        paginasTotais
                    )
                    .map((value) => {
                        return (
                            <Pagination.Item
                                key={value}
                                onClick={() =>
                                    value !== paginaAtual - 1
                                        ? mudarDePagina(value + 1)
                                        : {}
                                }
                            >
                                {value + 1}
                            </Pagination.Item>
                        );
                    })}
            {ultimo && (
                <Pagination.Next
                    onClick={() =>
                        paginaAtual < paginasTotais
                            ? mudarDePagina(paginaAtual + 1)
                            : {}
                    }
                    disabled={paginaAtual >= paginasTotais}
                />
            )}
            {ultimo && (
                <Pagination.Last
                    onClick={() =>
                        paginaAtual < paginasTotais
                            ? mudarDePagina(paginasTotais)
                            : {}
                    }
                    disabled={paginaAtual >= paginasTotais}
                />
            )}
        </Pagination>
    ) : (
        <></>
    );
}
