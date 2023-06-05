type CardsProdutosProps = {
    children?: React.ReactNode;
};

export default function CardsProdutos({ children }: CardsProdutosProps) {
    return (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 g-4'>
            {children}
        </div>
    );
}
