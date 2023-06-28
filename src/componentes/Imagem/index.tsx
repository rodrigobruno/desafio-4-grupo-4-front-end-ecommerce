import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Placeholder from 'assets/placeholder.svg';
import { SyntheticEvent } from 'react';
type Effect = 'blur' | 'black-and-white' | 'opacity';

interface Props {
    src: string;
    alt: string;
    placeholderSrc?: string;
    width?: number;
    height?: number;
    effect?: Effect;
    className?: string;
}

export default function Imagem({
    src,
    alt,
    placeholderSrc = '',
    width,
    height,
    effect = 'blur',
    className = '',
}: Props) {
    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        return ((e.target as HTMLImageElement).src = Placeholder);
    };

    return (
        <LazyLoadImage
            src={src}
            width={width}
            height={height}
            placeholderSrc={placeholderSrc}
            alt={alt}
            effect={effect}
            className={className}
            onError={onImageError}
        />
    );
}
