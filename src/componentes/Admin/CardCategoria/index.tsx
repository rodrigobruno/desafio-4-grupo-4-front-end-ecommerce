import { Button, Modal } from 'react-bootstrap';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import PedidoInformacao from './CategoriaInformacao';
import { useState } from 'react';
import { api } from 'lib/axios';
import { Container, Botoes } from './style';
import { useAppSelector } from 'hooks';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    id: string;
    nome: string;
    pegarCategorias: () => void;
}

export default function CardCategoriaAdmin({
    id,
    nome,
    pegarCategorias,
}: Props) {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [estaExcluindo, setEstaExcluindo] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const lidandoComFechamentoDoModal = () => setMostrarModal(false);
    const lidandoComAberturaDoModal = () => setMostrarModal(true);

    const excluirCategoria = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        setEstaExcluindo(true);
        setMostrarModal(false);

        try {
            await api.delete(`/categories/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            });
            pegarCategorias();

            toast.success('Categoria excluida com sucesso', {
                position: toast.POSITION.TOP_RIGHT,
                closeOnClick: false,
                closeButton: false,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                autoClose: 2000,
            });
        } catch (error) {
            toast.error('Ocorreu um erro, tente novamente', {
                position: toast.POSITION.TOP_RIGHT,
                closeOnClick: false,
                closeButton: false,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                autoClose: 2000,
            });
        } finally {
            setEstaExcluindo(false);
        }
    };

    return (
        <>
            <Container>
                <PedidoInformacao titulo='ID' descricao={id} />
                <PedidoInformacao titulo='Nome' descricao={nome} />
                <Botoes>
                    <LinkContainer to={`/admin/categorias/editar/${id}`}>
                        <Button as='a'>
                            <PencilSquare className='bi me-2' />
                            Editar categoria
                        </Button>
                    </LinkContainer>
                    <Button
                        onClick={lidandoComAberturaDoModal}
                        variant='danger'
                        disabled={estaExcluindo}
                    >
                        <Trash3 className='bi me-2' />
                        Excluir categoria
                    </Button>
                </Botoes>
            </Container>

            <ToastContainer transition={Slide} />

            <Modal
                show={mostrarModal}
                onHide={lidandoComFechamentoDoModal}
                data-bs-theme='light'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-uppercase'>
                        Confirmar exclusão
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    A exclusão é permanente e não pode ser desfeita. Você quer
                    mesmo continuar?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='dark'
                        onClick={lidandoComFechamentoDoModal}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant='primary'
                        onClick={(e) => excluirCategoria(e, id)}
                    >
                        Sim, excluir!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
