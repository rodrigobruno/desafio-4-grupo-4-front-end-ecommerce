import styled from 'styled-components';

export const Container = styled.div`
    overflow: hidden;

    & .card-pedido__titulo {
        margin-bottom: 0.3125rem;
    }

    & .card-pedido__informacao {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: var(--font-weight-bold);
    }
`;
