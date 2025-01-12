const BrandItemCard = ({ brand }) => {
    return (
        <div className="grid grid-cols-12 gap-4 p-4 items-center">
            <div className="col-span-5 flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <img 
                        src={brand?.image} 
                        alt={brand?.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                        {brand?.name}
                    </h3>
                </div>
            </div>
            
            <div className="col-span-7">
                <p className="text-sm text-gray-500 line-clamp-2">
                    {brand?.description || 'No description available'}
                </p>
            </div>
        </div>
    );
};

export default BrandItemCard;