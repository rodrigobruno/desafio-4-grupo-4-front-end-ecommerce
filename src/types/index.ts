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
            _id: number;
            title: string;
            //desc: string;
            img: string;
            //categories: [string];
            price: number;
            quantity: number;
            //_id: string
        }
    ];
    amount: number;
    address: string;
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
    username: string | null;
    email: string | null;
    isAdmin: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
    __v: number | null;
    accessToken: string | null;
    carregando: boolean;
}

export interface Usuario {
    _id: number;
    username: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    accessToken: string;
}

export interface LoginResponse {
    data: Usuario;
}

export interface UserResponse {
    data: {
        _id: number;
        username: string;
        email: string;
        isAdmin: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}

export interface CamposFormUsuario {
    username: string;
    email: string;
    password?: string;
}

export interface ErrosFormUsuario {
    username: string | null;
    email: string | null;
    password?: string | null;
}
