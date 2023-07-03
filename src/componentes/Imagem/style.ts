import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ImagemQuadrada = styled(LazyLoadImage)`
    aspect-ratio: 1 / 1;
    object-fit: contain;
    width: 100%;
`;
