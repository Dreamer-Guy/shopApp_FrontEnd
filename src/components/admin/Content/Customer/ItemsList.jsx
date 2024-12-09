import ItemCard from "./ItemCard";

const ItemsList = ({ users }) => {
    return (
        <div className="w-full flex flex-col">
            {users.map((user,index) => (
                <ItemCard key={index} user={user} />
            ))}
        </div>
    );
};

export default ItemsList;