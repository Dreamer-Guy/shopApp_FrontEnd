import SoftDeletedProductCard from "./softDeletedCard";

const SoftDeletedProductList = ({ products }) => {
    return(
        <div>
            <div className="hidden md:flex flex-row justify-between w-11/12 px-5 text-lg font-semibold">
                <div className="flex flex-row justify-center items-center w-1/5">
                    <h3 className="text-lg font-semibold">Products</h3>
                </div>
                <div className="w-2/5 flex flex-row justify-between">
                    <p className="flex flex-row justify-start">Price</p>
                    <p className="flex flex-row justify-start">Sale Price</p>
                    <p className="flex flex-row justify-end">Stock</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {products.map((product,index) => (
                    <div
                        key={index}
                        className="hover:cursor-pointer">
                        <SoftDeletedProductCard product={product} key={index}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default SoftDeletedProductList;