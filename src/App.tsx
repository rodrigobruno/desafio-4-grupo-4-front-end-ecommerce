import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Cadastro from './paginas/Cadastro';
import NaoEncontrada from './paginas/NaoEncontrada';
import Topo from './componentes/Topo';
import Produtos from './paginas/Produtos';

export default function App() {
    return (
        <BrowserRouter>
            <Topo />
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/produtos' element={<Produtos />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='*' element={<NaoEncontrada />} />
            </Routes>
        </BrowserRouter>
    );
}
