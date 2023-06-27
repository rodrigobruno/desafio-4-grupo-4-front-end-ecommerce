import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { precoFormatadoParaReal } from 'utils';
import PedidoInformacao from './ProdutoInformacao';
import { useState } from 'react';
import { api } from 'lib/axios';
import { Container, Imagem, Botoes, ToastBodyColor } from './style';
import { useAppSelector } from 'hooks';

interface Props {
    numero: string;
    imagem: string;
    nome: string;
    preco: number;
    pegarProdutos: () => void;
}

export default function CardProdutoAdmin({
    numero,
    imagem,
    nome,
    preco,
    pegarProdutos,
}: Props) {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const precoEmReais = precoFormatadoParaReal(preco);
    const [estaExcluindo, setEstaExcluindo] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarToast, setMostrarToast] = useState(false);
    const lidandoComFechamentoDoModal = () => setMostrarModal(false);
    const lidandoComAberturaDoModal = () => setMostrarModal(true);

    const excluirProduto = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        setEstaExcluindo(true);
        setMostrarToast(false);
        setMostrarModal(false);

        try {
            await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            });
            pegarProdutos();
        } catch (error) {
            setMostrarToast(true);
        } finally {
            setEstaExcluindo(false);
        }
    };

    return (
        <>
            <Container>
                <Imagem src={imagem} alt={nome} />
                <PedidoInformacao titulo={numero} descricao={nome} />
                <PedidoInformacao titulo='Preço' descricao={precoEmReais} />
                <Botoes>
                    <LinkContainer to={`/admin/produtos/editar/${numero}`}>
                        <Button as='a'>
                            <PencilSquare className='bi me-2' />
                            Editar produto
                        </Button>
                    </LinkContainer>
                    <Button
                        onClick={lidandoComAberturaDoModal}
                        variant='danger'
                        disabled={estaExcluindo}
                    >
                        <Trash3 className='bi me-2' />
                        Excluir produto
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
                        onClick={(e) => excluirProduto(e, numero)}
                    >
                        Sim, excluir!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
