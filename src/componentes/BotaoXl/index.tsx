import React, { ReactNode } from 'react';
import { Botao } from './style';

interface Props {
    variant?: string;
    onClick?: () => void;
    children: ReactNode;
}

export default function BotaoXl({
    variant = 'primary',
    onClick,
    children,
}: Props) {
    return (
        <Botao variant={variant} size='lg' onClick={onClick}>
            {children}
        </Botao>
    );
}
