import { CarregandoPaginaContainer } from './style';

import Carregando from 'componentes/Carregando';
import { Scrollbar } from 'componentes/Scrollbar';

interface Props {
    visibilidade: boolean;
}

export default function CarregandoPagina({ visibilidade }: Props) {
    return (
        <>
            <Scrollbar visibilidade={visibilidade} />

            <CarregandoPaginaContainer visibilidade={visibilidade}>
                <Carregando largura={3} altura={3} cor='var(--cor-verde-1)' />
            </CarregandoPaginaContainer>
        </>
    );
}
