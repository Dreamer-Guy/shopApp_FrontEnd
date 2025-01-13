import ItemCard from "./ItemCard";

const ItemsList = ({ users }) => {
    if (!users?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500 text-lg">No customers found</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
                {users.map((user, index) => (
                    <ItemCard key={user._id || index} user={user} />
                ))}
            </div>
        </div>
    );
};

export default ItemsList;