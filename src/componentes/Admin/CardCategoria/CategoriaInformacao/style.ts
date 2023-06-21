import styled from 'styled-components';

export const Container = styled.div`
    overflow: hidden;

    & .informacao {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: var(--font-weight-bold);
    }
`;

export const Titulo = styled.p`
    font-weight: var(--font-weight-regular);
    margin-bottom: 0.3125rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
