import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled(Pagination)`
    & .page-item.active.disabled > .page-link {
        color: var(--bs-pagination-active-color);
        background-color: #49d13a;
        border-color: #49d13a;
    }
`;
