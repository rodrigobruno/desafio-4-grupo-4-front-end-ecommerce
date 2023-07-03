export interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export type PedidoProps = {
    _id: string;
    userId: string;
    products: [
        {
            product: {
                _id: string;
                title: string;
                img: string;
                price: number;
            };
            quantity: number;
            _id: string;
        }
    ];
    amount: number;
    address: Endereco;
    status: string;
    createdAt: string;
};

export interface Categorias {
    _id: string;
    title: string;
}

export type CardPedidosProps = {
    _id: string;
    amount: number;
    status: string;
    createdAt: string;
};

export interface Produto {
    _id: string;
    title: string;
    desc?: string;
    img: string;
    categories?: Categorias[];
    price: number;
}

export interface Produtos {
    product: Produto;
    quantity: number;
}

export interface UsuarioState {
    _id: number | null;
    nameid: string | null;
    username: string | null;
    emails: string | null;
    isAdmin: boolean | null;
    __v: number | null;
    accessToken: string | null;
    carregando: boolean;
}

export interface Usuario {
    _id: number;
    nameid: string;
    username: string;
    emails: string;
    isAdmin: boolean;
    __v: number;
    accessToken: string;
}

export interface LoginResponse {
    data: Usuario;
}

export interface UserResponse {
    data: {
        _id: number;
        nameid: string;
        username: string;
        emails: string;
        isAdmin: boolean;
        __v: number;
    };
}

export interface CamposFormLogin {
    username: string;
    password?: string;
}

export interface ErrosFormLogin {
    username: string | null;
    password?: string | null;
}

export interface Feedback {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    ocorreuErroNaRespostaApi: boolean;
}

export interface ProdutosQuery {
    pagina?: number;
    limite?: number;
    categoria?: string;
    mostrarFiltro?: boolean;
    verMais?: boolean;
}
export interface UsuarioQuery {
    pagina?: number;
    limite?: number;
}
