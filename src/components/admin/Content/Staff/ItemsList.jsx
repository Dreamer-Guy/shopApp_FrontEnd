import ItemCard from "./ItemCard";

const ItemsList = ({ staffs }) => {
    return (
        <div className="w-full flex flex-col">
            {staffs.map((staff,index) => (
                <ItemCard key={index} user={staff} />
            ))}
        </div>
    );
};

export default ItemsList;