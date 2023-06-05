import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import PaginaPadrao from 'componentes/PaginaPadrao';
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
import ScrollToTop from 'componentes/ScrollToTop';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<PaginaPadrao />}>
                    <Route index element={<Inicio />} />
                    <Route path='produtos' element={<Produtos />} />
                    <Route path='produto' element={<Produto />} />
                    <Route path='categorias' element={<Categorias />} />
                    <Route path='carrinho' element={<Carrinho />} />
                    <Route path='sucesso' element={<Sucesso />} />
                    <Route path='entrar' element={<Entrar />} />
                    <Route path='cadastrar' element={<Cadastrar />} />
                    <Route path='pedidos' element={<Pedidos />} />
                    <Route path='pedido' element={<Pedido />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='*' element={<NaoEncontrada />} />
                </Route>

                <Route path='/admin' element={<PaginaAdmin />}>
                    <Route index element={<Admin />} />
                    <Route path='pedido' element={<AdminPedido />} />

                    <Route path='produtos' element={<AdminProdutos />} />
                    <Route
                        path='novo-produto'
                        element={<AdminCriarProduto />}
                    />
                    <Route
                        path='editar-produto'
                        element={<AdminEditarProduto />}
                    />

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
                    <Route
                        path='nova-usuario'
                        element={<AdminCriarUsurario />}
                    />
                    <Route
                        path='editar-usuario'
                        element={<AdminEditarUsuario />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
