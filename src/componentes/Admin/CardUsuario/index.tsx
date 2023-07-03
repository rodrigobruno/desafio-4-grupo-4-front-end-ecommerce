import { Button, Modal } from 'react-bootstrap';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { api } from 'lib/axios';
import { Container, Botoes } from './style';
import UsuarioInformacao from './UsuarioInformacao';
import { useAppSelector } from 'hooks';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Users {
    id: string;
    nome: string;
    usuario: string;
    email: string;
    admin: boolean;
    pegarUsuario: () => void;
}

export default function CardUsuarioAdmin({
    id,
    nome,
    usuario,
    email,
    admin,
    pegarUsuario,
}: Users) {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const [estaExcluindo, setEstaExcluindo] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const lidandoComFechamentoDoModal = () => setMostrarModal(false);
    const lidandoComAberturaDoModal = () => setMostrarModal(true);

    const excluirUsuario = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        setEstaExcluindo(true);
        setMostrarModal(false);

        try {
            await api.delete(`/users/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            });
            pegarUsuario();

            toast.success('Usuário excluido com sucesso', {
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
                <UsuarioInformacao
                    titulo='Admin'
                    descricao={admin ? 'Sim' : 'Não'}
                />
                <UsuarioInformacao titulo={id} descricao={nome} />
                <UsuarioInformacao titulo='E-mail' descricao={email} />

                <Botoes>
                    <LinkContainer to={`/admin/usuarios/editar/${id}`}>
                        <Button as='a'>
                            <PencilSquare className='bi me-2' />
                            Editar usuário
                        </Button>
                    </LinkContainer>
                    <Button
                        onClick={lidandoComAberturaDoModal}
                        variant='danger'
                        disabled={estaExcluindo}
                    >
                        <Trash3 className='bi me-2' />
                        Excluir usuário
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
                        onClick={(e) => excluirUsuario(e, id)}
                    >
                        Sim, excluir!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
