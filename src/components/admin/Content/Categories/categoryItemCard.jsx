const CategoryItemCard = ({ category }) => {
    return (
        <div className="grid grid-cols-12 gap-6 p-4 items-center hover:bg-gray-50 transition-colors">
            {/* Image & Name */}
            <div className="col-span-5 flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                </div>
            </div>

            {/* Description */}
            <div className="col-span-7 pr-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                    {category.description || 'No description available'}
                </p>
            </div>
        </div>
    );
};

export default CategoryItemCard;