import { useNavigate } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { Dice5Fill } from 'react-bootstrap-icons';

interface Props {
    classes: string;
}

export default function ErroAtualizarPagina({ classes }: Props) {
    const navigate = useNavigate();

    return (
        <div className={classes}>
            <Alert
                key='erro-api-inicio'
                variant='warning'
                className='w-100 text-center'
            >
                <span className='me-2'>Algo deu errado</span>
                <Button
                    className='d-inline-flex align-items-center'
                    variant='warning'
                    onClick={() => navigate(0)}
                >
                    <Dice5Fill className='me-2' />
                    Jogue o dado novamente
                </Button>
            </Alert>
        </div>
    );
}
