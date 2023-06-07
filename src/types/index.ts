// export type CardProdutoProps = {
//     category?: string;
//     description?: string;
//     id?: number;
//     image: string;
//     price: number;
//     rating?: {
//         rate: number;
//         count: number;
//     };
//     title: string;
// };

export type CardProdutoProps = {
    id?: number;
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
