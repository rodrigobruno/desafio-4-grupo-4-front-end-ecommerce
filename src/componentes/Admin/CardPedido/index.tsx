import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { CardText, Trash3 } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { precoFormatadoParaReal, dataFormatadaParaDDMMYY } from 'utils';
import { Container, Botoes, ToastBodyColor } from './style';
import PedidoInformacao from './PedidoInformacao';
import { api } from 'lib/axios';
import { useState } from 'react';

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
    const totalEmReais = precoFormatadoParaReal(total);
    const dataFormatada = dataFormatadaParaDDMMYY(data);

    const [estaExcluindo, setEstaExcluindo] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarToast, setMostrarToast] = useState(false);
    const lidandoComFechamentoDoModal = () => setMostrarModal(false);
    const lidandoComAberturaDoModal = () => setMostrarModal(true);

    const excluirPedido = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        setEstaExcluindo(true);
        setMostrarToast(false);
        setMostrarModal(false);

        try {
            await api.delete(`/orders/${id}`);
            pegarPedidos();
        } catch (error) {
            setMostrarToast(true);
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
                        onClick={(e) => excluirPedido(e, numero)}
                    >
                        Sim, excluir!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
