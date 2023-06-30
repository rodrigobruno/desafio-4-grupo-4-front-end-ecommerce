import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ImagemContainer = styled.div`
    & .lazy-load-image-background {
        width: 100%;
        height: 100%;
    }
`;

export const ImagemQuadrada = styled(LazyLoadImage)`
    aspect-ratio: 1 / 1;
    object-fit: contain;
    width: 100%;
`;
