import ItemCard from "./ItemCard";

const ItemsList = ({ staffs }) => {
    if (!staffs?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                        />
                    </svg>
                </div>
                <p className="text-gray-500 text-lg">No staff members found</p>
            </div>
        );
    }

    return (
        <div className="w-full divide-y divide-gray-100">
            {staffs.map((staff, index) => (
                <div key={staff._id || index} 
                    className={`
                        transition-colors duration-200
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        ${index === 0 ? 'rounded-t-lg' : ''}
                        ${index === staffs.length - 1 ? 'rounded-b-lg' : ''}
                    `}
                >
                    <ItemCard user={staff} />
                </div>
            ))}
        </div>
    );
};

export default ItemsList;