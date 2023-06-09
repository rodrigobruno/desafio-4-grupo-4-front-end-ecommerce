import { Button } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

interface Props {
    classes: string;
    para: string;
    variacao:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'light'
        | 'dark'
        | 'link';
    tamanho: 'sm' | 'lg';
}

export default function BotaoMais({ classes, para, variacao, tamanho }: Props) {
    return (
        <div className={classes}>
            <LinkContainer to={para}>
                <Button
                    variant={variacao}
                    size={tamanho}
                    as='a'
                    className='d-flex align-items-center'
                >
                    <PlusCircle className='me-3' />
                    Ver mais produtos
                </Button>
            </LinkContainer>
        </div>
    );
}
