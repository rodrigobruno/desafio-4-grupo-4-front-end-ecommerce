import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { api } from 'lib/axios';
import { Container, Botoes, ToastBodyColor } from './style';
import UsuarioInformacao from './UsuarioInformacao';

interface Users {
    id:string;
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
    pegarUsuario
}: Users) {
    const [estaExcluindo, setEstaExcluindo] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarToast, setMostrarToast] = useState(false);
    const lidandoComFechamentoDoModal = () => setMostrarModal(false);
    const lidandoComAberturaDoModal = () => setMostrarModal(true);

    const excluirUsuario = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        setEstaExcluindo(true);
        setMostrarToast(false);
        setMostrarModal(false);

        //await new Promise((res) => setTimeout(res, 3000));

        try {
            await api.delete(`/products/${id}`);
            pegarUsuario();
        } catch (error) {
            setMostrarToast(true);
        } finally {
            setEstaExcluindo(false);
        }
    };

    return (
        <>
            <Container>
                <UsuarioInformacao titulo="ID" descricao={id} />
                <UsuarioInformacao titulo='NOME' descricao={nome} />
                <UsuarioInformacao titulo='USUÁRIO' descricao={usuario} />
                <UsuarioInformacao titulo='E-MAIL' descricao={email} />
                <UsuarioInformacao titulo='ADMINISTRADOR' descricao={admin? "Sim" : "Não"} />

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
                        onClick={(e) => excluirUsuario(e,id)}
                    >
                        Sim, excluir!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}