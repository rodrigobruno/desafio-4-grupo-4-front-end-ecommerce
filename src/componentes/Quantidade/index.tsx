import { DashLg, PlusLg } from 'react-bootstrap-icons';
import { BotaoQuantidades, Quantidade } from './style';

interface Props {
    nome: string;
    quntidade: number;
    adicionar: () => void;
    remover: () => void;
}

export default function AdicionarRemoverQuatidade({
    nome,
    quntidade,
    adicionar,
    remover,
}: Props) {
    return (
        <div className='d-flex align-items-center'>
            <BotaoQuantidades
                variant='outline-light'
                size='sm'
                onClick={remover}
                disabled={quntidade === 1}
            >
                <DashLg className='bi' />
                <span className='visually-hidden'>Retirar um {nome}</span>
            </BotaoQuantidades>
            <Quantidade className='user-select-none'>
                {quntidade}
                <span className='visually-hidden'>{' ' + nome}</span>
            </Quantidade>
            <BotaoQuantidades
                variant='outline-light'
                size='sm'
                onClick={adicionar}
            >
                <PlusLg className='bi' />
                <span className='visually-hidden'>
                    Adicionar mais um {nome}
                </span>
            </BotaoQuantidades>
        </div>
    );
}
