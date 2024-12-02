const BrandItemCard = ({ brand }) => {
    return (
        <div className="w-full flex flex-row items-center justify-between">
            <div className="w-1/4 flex flex-row justify-start items-center gap-3">
                <div>
                    <img src={brand?.image} alt={brand?.name} className="w-20 h-20 object-cover rounded-lg" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{brand?.name}</h3>
                </div>
            </div>
            <div className="w-1/3 flex flex-row justify-start">
                <p className="text-sm">{brand?.description}</p>
            </div>
        </div>
    );
};

export default BrandItemCard;