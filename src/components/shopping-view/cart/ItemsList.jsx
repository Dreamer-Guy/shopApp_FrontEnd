import ItemCard from "./ItemCard";

const ItemsList = ({ items, onRemove }) => {
    return (
        <div className=" w-full flex flex-col ">
            <div className="w-full hidden md:flex flex-row font-semibold">
                <h3 className="w-2/5">Item</h3>
                <div className="w-3/5 flex flex-row">
                    <div className="w-10/12 flex flex-row justify-between">
                        <h3>Price</h3>
                        <h3>Quantity</h3>
                        <h3>Subtotal</h3>
                    </div>
                </div>
            </div>
            <div className="w-full">
                {
                    items.map(item=><ItemCard key={item.productId._id} item={item}/>)
                }
            </div>
        </div>
    );
};

export default ItemsList;