import { Container, Titulo } from './style';

interface Users {
    titulo: string;
    descricao: string;
}

export default function UsuarioInformacao({ titulo, descricao }: Users) {
    return (
        <Container>
            <Titulo>{titulo}</Titulo>
            <h3 className='h4 informacao'>{descricao}</h3>
        </Container>
    );
}