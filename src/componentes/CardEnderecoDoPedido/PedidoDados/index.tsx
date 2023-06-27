interface Props {
    descricao: string | number;
}

export default function PedidoDados({ descricao }: Props) {
    return <div>{descricao}</div>;
}
