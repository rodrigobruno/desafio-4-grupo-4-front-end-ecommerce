import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import PedidoInformacao from './CategoriaInformacao';
import { useState } from 'react';
import { api } from 'lib/axios';
import { Container, Botoes, ToastBodyColor } from './style';

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
    const [estaExcluindo, setEstaExcluindo] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarToast, setMostrarToast] = useState(false);
    const lidandoComFechamentoDoModal = () => setMostrarModal(false);
    const lidandoComAberturaDoModal = () => setMostrarModal(true);

    const excluirCategoria = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        setEstaExcluindo(true);
        setMostrarToast(false);
        setMostrarModal(false);

        try {
            await api.delete(`/categories/${id}`);
            pegarCategorias();
        } catch (error) {
            setMostrarToast(true);
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

            <ToastContainer
                position='top-center'
                className='position-fixed mt-3'
            >
                <Toast
                    show={mostrarToast}
                    bg='warning'
                    onClose={() => setMostrarToast(false)}
                    delay={5000}
                    autohide
                >
                    <ToastBodyColor>
                        Ocorreu um erro, tente novamente.
                    </ToastBodyColor>
                </Toast>
            </ToastContainer>

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
