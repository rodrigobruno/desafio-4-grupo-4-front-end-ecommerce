import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from 'componentes/PrivateRoute';
import { LoginRoute } from 'componentes/LoginRoute';

import PaginaPadrao from 'componentes/PaginaPadrao';

import Inicio from './paginas/Inicio';
import NaoEncontrada from './paginas/NaoEncontrada';
import Produtos from './paginas/Produtos';
import Checkout from 'paginas/Checkout';
import Sucesso from 'paginas/Sucesso';
import Cadastrar from 'paginas/Cadastrar';
import Entrar from 'paginas/Entrar';
import Pedidos from 'paginas/Pedidos';
import Pedido from 'paginas/Pedidos/Pedido';
import Profile from 'paginas/Profile';
import Categorias from 'paginas/Categorias';
import PaginaAdmin from 'componentes/PaginaAdmin';
import AdminInicio from 'paginas/Admin/Inicio';
import AdminPedidos from 'paginas/Admin/Pedidos';
import AdminPedido from 'paginas/Admin/Pedidos/Pedido';
import AdminProdutos from 'paginas/Admin/Produtos';
import AdminCriarProduto from 'paginas/Admin/Produtos/CriarProduto';
import AdminEditarProduto from 'paginas/Admin/Produtos/EditarProduto';
import AdminCategorias from 'paginas/Admin/Categorias';
import AdminCriarCategoria from 'paginas/Admin/Categorias/CriarCategoria';
import AdminEditarCategoria from 'paginas/Admin/Categorias/EditarCategoria';
import AdminUsuarios from 'paginas/Admin/Usuarios';
import AdminCriarUsurario from 'paginas/Admin/Usuarios/CriarUsuario';
import AdminEditarUsuario from 'paginas/Admin/Usuarios/EditarUsuario';
import AdminCupons from 'paginas/Admin/Cupons';
import PaginaFullWidth from 'componentes/PaginaFullWidth';
import ProdutosCategoria from 'paginas/Produtos/ProdutosCategoria';
import AlterarSenha from 'paginas/Profile/AlterarSenha';
import PaginaDeProduto from 'paginas/Produtos/Produto';
import PaginaSemRodape from 'componentes/PaginaSemRodape';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<PaginaFullWidth />}>
                <Route index element={<Inicio />} />
                <Route
                    path='cadastrar'
                    element={
                        <LoginRoute>
                            <Cadastrar />
                        </LoginRoute>
                    }
                />
                <Route
                    path='/entrar'
                    element={
                        <LoginRoute>
                            <Entrar />
                        </LoginRoute>
                    }
                />
            </Route>

            <Route path='/' element={<PaginaSemRodape />}>
                <Route
                    path='finalizar-compra'
                    element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    }
                />
                <Route path='*' element={<NaoEncontrada />} />
            </Route>

            <Route path='/' element={<PaginaPadrao />}>
                <Route path='produtos' element={<Produtos />} />
                <Route path='produtos/:id' element={<ProdutosCategoria />} />
                <Route path='produto/:id' element={<PaginaDeProduto />} />
                <Route path='categorias' element={<Categorias />} />

                <Route
                    path='sucesso/:id'
                    element={
                        <PrivateRoute>
                            <Sucesso />
                        </PrivateRoute>
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
                    path='pedidos/:id'
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
                <Route
                    path='senha'
                    element={
                        <PrivateRoute>
                            <AlterarSenha />
                        </PrivateRoute>
                    }
                />
            </Route>

            <Route path='/admin' element={<PaginaAdmin />}>
                <Route index element={<AdminInicio />} />
                <Route path='pedidos' element={<AdminPedidos />} />
                <Route path='pedidos/:id' element={<AdminPedido />} />

                <Route path='produtos' element={<AdminProdutos />} />
                <Route path='produtos/criar' element={<AdminCriarProduto />} />
                <Route
                    path='produtos/editar/:id'
                    element={<AdminEditarProduto />}
                />

                <Route path='categorias' element={<AdminCategorias />} />
                <Route
                    path='categorias/criar'
                    element={<AdminCriarCategoria />}
                />
                <Route
                    path='categorias/editar/:id'
                    element={<AdminEditarCategoria />}
                />

                <Route path='usuarios' element={<AdminUsuarios />} />
                <Route path='usuarios/criar' element={<AdminCriarUsurario />} />
                <Route
                    path='usuarios/editar/:id'
                    element={<AdminEditarUsuario />}
                />

                <Route path='cupons' element={<AdminCupons />} />
            </Route>
        </Routes>
    );
}
