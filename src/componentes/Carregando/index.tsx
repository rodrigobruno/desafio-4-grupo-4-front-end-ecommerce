import { CarregandoContainer } from './style';

interface Props {
    largura?: number;
    altura?: number;
    cor?: string;
    className?: string;
}

export default function Carregando({
    largura = 16,
    altura = 16,
    cor = '#FFFFFF',
    className,
}: Props) {
    return (
        <CarregandoContainer
            largura={largura}
            altura={altura}
            cor={cor}
            className={className}
            role='status'
        >
            <span className='visually-hidden'>Carregando...</span>
        </CarregandoContainer>
    );
}
