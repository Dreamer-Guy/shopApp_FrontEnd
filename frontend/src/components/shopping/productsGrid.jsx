import ProductCard from "./productCard";

const ProductsGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {products.map((product,index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
};

export default ProductsGrid;