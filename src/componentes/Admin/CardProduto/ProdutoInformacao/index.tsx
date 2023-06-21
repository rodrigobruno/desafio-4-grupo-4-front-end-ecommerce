import { Container, Titulo } from './style';

interface Props {
    titulo: string;
    descricao: string | number;
}

export default function ProdutoInformacaoAdmin({ titulo, descricao }: Props) {
    return (
        <Container>
            <Titulo>{titulo}</Titulo>
            <h3 className='h4 informacao'>{descricao}</h3>
        </Container>
    );
}
