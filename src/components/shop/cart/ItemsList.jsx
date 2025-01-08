import ItemCard from "./ItemCard";

const ItemsList = ({ items, onRemove }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full hidden md:flex flex-row font-semibold border-b border-black pb-2">
                <div className="w-2/5">
                    <h3>Item</h3>
                </div>
                <div className="w-3/5 flex flex-row">
                    <div className="w-[90%] flex flex-row">
                        <div className="w-[30%] flex justify-center">
                            <h3>Price</h3>
                        </div>
                        <div className="w-[30%] flex justify-center">
                            <h3>Quantity</h3>
                        </div>
                        <div className="w-[30%] flex justify-center">
                            <h3>Subtotal</h3>
                        </div>
                    </div>
                    <div className="w-[10%]"></div>
                </div>
            </div>
            <div className="w-full">
                {items.map(item => (
                    <ItemCard key={item.productId._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ItemsList;