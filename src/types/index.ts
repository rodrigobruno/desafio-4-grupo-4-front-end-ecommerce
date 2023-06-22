export type CardPedidosProps = {
    _id: string;
    //userId: string;
    //products: [{ productId: string; quantity: number; _id: string }];
    amount: number;
    //address: string;
    status: string;
    createdAt: string;
    //updatedAt: string;
    //__v: number;
};

export type PedidoProps = {
    _id: string;
    userId: string;
    products: [
        {
            product: {
                _id: string;
                title: string;
                //desc: string;
                img: string;
                //categories: [string];
                price: number;
            };
            quantity: number;
            _id: string;
        }
    ];
    amount: number;
    address: {
        rua: string;
        numero: string;
    };
    status: string;
    createdAt: string;
    //updatedAt: string;
    //__v: number;
};

export type CardProdutoProps = {
    _id?: number;
    title: string;
    desc?: string;
    img: string;
    categories?: string;
    price: number;
};

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

export interface Categorias {
    _id: string;
    title: string;
}

export interface Produto {
    _id: string;
    title: string;
    desc: string;
    img: string;
    categories: Categorias[];
    price: number;
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
}
