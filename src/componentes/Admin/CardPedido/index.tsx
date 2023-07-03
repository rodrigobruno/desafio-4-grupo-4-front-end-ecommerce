import { Button, Modal } from 'react-bootstrap';
import { CardText, Trash3 } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { precoFormatadoParaReal, dataFormatadaParaDDMMYY } from 'utils';
import { Container, Botoes } from './style';
import PedidoInformacao from './PedidoInformacao';
import { api } from 'lib/axios';
import { useState } from 'react';
import { useAppSelector } from 'hooks';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    id: string;
    numero: string;
    data: string;
    total: number;
    status: string;
    pegarPedidos: () => void;
}

export default function CardPedidoAdmin({
    id,
    numero,
    data,
    total,
    status,
    pegarPedidos,
}: Props) {
    const accessToken =
        useAppSelector((state) => state.authSlice.accessToken) ||
        localStorage.getItem('@autenticacao-react:token');
    const totalEmReais = precoFormatadoParaReal(total);
    const dataFormatada = dataFormatadaParaDDMMYY(data);

    const [estaExcluindo, setEstaExcluindo] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const lidandoComFechamentoDoModal = () => setMostrarModal(false);
    const lidandoComAberturaDoModal = () => setMostrarModal(true);

    const excluirPedido = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        setEstaExcluindo(true);
        setMostrarModal(false);

        try {
            await api.delete(`/orders/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            });
            pegarPedidos();

            toast.success('Pedido excluido com sucesso', {
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
                <PedidoInformacao titulo='Número' descricao={numero} />
                <PedidoInformacao titulo='Data' descricao={dataFormatada} />
                <PedidoInformacao titulo='Total' descricao={totalEmReais} />
                <PedidoInformacao titulo='Status' descricao={status} />
                <Botoes>
                    <LinkContainer to={`/admin/pedidos/${id}`}>
                        <Button as='a'>
                            <CardText className='bi me-2' />
                            Detalhes do pedido
                        </Button>
                    </LinkContainer>
                    <Button
                        onClick={lidandoComAberturaDoModal}
                        variant='danger'
                        disabled={estaExcluindo}
                    >
                        <Trash3 className='bi me-2' />
                        Excluir pedido
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
                        onClick={(e) => excluirPedido(e, numero)}
                    >
                        Sim, excluir!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
