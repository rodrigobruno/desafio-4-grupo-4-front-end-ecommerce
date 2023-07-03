import { Button, Modal } from 'react-bootstrap';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { precoFormatadoParaReal } from 'utils';
import PedidoInformacao from './ProdutoInformacao';
import { useState } from 'react';
import { api } from 'lib/axios';
import { Container, Imagem, Botoes } from './style';
import { useAppSelector } from 'hooks';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const lidandoComFechamentoDoModal = () => setMostrarModal(false);
    const lidandoComAberturaDoModal = () => setMostrarModal(true);

    const excluirProduto = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        setEstaExcluindo(true);
        setMostrarModal(false);

        try {
            await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            });
            pegarProdutos();

            toast.success('Produto excluido com sucesso', {
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
                        onClick={(e) => excluirProduto(e, numero)}
                    >
                        Sim, excluir!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
