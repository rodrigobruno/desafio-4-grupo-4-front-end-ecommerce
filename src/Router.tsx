import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from 'componentes/PrivateRoute';
import { LoginRoute } from 'componentes/LoginRoute';

import PaginaBackground from 'componentes/PaginaBackground';
import PaginaPadrao from 'componentes/PaginaPadrao';

import Inicio from './paginas/Inicio';
import NaoEncontrada from './paginas/NaoEncontrada';
import Produtos from './paginas/Produtos';
import Produto from 'paginas/Produtos/Produto';
import Carrinho from 'paginas/Carrinho';
import Sucesso from 'paginas/Sucesso';
import Cadastrar from 'paginas/Cadastrar';
import Entrar from 'paginas/Entrar';
import Pedidos from 'paginas/Pedidos';
import Pedido from 'paginas/Pedidos/Pedido';
import Profile from 'paginas/Profile';
import PaginaAdmin from 'componentes/PaginaAdmin';
import Admin from 'paginas/Admin';
import AdminPedido from 'paginas/Admin/Pedido';
import AdminProdutos from 'paginas/Admin/Produtos/CriarProduto';
import AdminCriarProduto from 'paginas/Admin/Produtos/CriarProduto';
import AdminEditarProduto from 'paginas/Admin/Produtos/EditarProduto';
import AdminCategorias from 'paginas/Admin/Categorias';
import AdminCriarCategoria from 'paginas/Admin/Categorias/CriarCategoria';
import AdminEditarCategoria from 'paginas/Admin/Categorias/EditarCategoria';
import AdminUsuarios from 'paginas/Admin/Usuarios';
import AdminCriarUsurario from 'paginas/Admin/Usuarios/CriarUsuario';
import AdminEditarUsuario from 'paginas/Admin/Usuarios/EditarUsuario';
import Categorias from 'paginas/Categorias';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<PaginaPadrao />}>
                <Route index element={<Inicio />} />
                <Route path='produtos' element={<Produtos />} />
                <Route path='produto' element={<Produto />} />
                <Route path='categorias' element={<Categorias />} />
                <Route path='carrinho' element={<Carrinho />} />
                <Route path='sucesso' element={<Sucesso />} />
                <Route
                    path='cadastrar'
                    element={
                        <LoginRoute>
                            <Cadastrar />
                        </LoginRoute>
                    }
                />
                <Route
                    path='pedidos'
                    element={
                        <PrivateRoute>
                            <Pedidos />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='pedido'
                    element={
                        <PrivateRoute>
                            <Pedido />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='perfil'
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route path='*' element={<NaoEncontrada />} />
            </Route>

            <Route path='/' element={<PaginaBackground />}>
                <Route
                    path='/entrar'
                    element={
                        <LoginRoute>
                            <Entrar />
                        </LoginRoute>
                    }
                />
            </Route>

            <Route path='/admin' element={<PaginaAdmin />}>
                <Route index element={<Admin />} />
                <Route path='pedido' element={<AdminPedido />} />

                <Route path='produtos' element={<AdminProdutos />} />
                <Route path='novo-produto' element={<AdminCriarProduto />} />
                <Route path='editar-produto' element={<AdminEditarProduto />} />

                <Route path='categorias' element={<AdminCategorias />} />
                <Route
                    path='nova-categoria'
                    element={<AdminCriarCategoria />}
                />
                <Route
                    path='editar-categoria'
                    element={<AdminEditarCategoria />}
                />

                <Route path='usuarios' element={<AdminUsuarios />} />
                <Route path='nova-usuario' element={<AdminCriarUsurario />} />
                <Route path='editar-usuario' element={<AdminEditarUsuario />} />
            </Route>
        </Routes>
    );
}
