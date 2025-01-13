import BrandItemCard from "./BrandItemCard";
import { useNavigate } from "react-router-dom";

const BrandsList = ({ brands, isLoading, error }) => {
    const navigate = useNavigate();
    
    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500">Loading brands...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-500">Error loading brands: {error}</p>
            </div>
        );
    }

    if (!brands?.length) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500">No brands found</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-100">
            {brands.map((brand, index) => (
                <div
                key={index}
                onClick={() =>{}} 
                className="border border-black rounded-lg hover:cursor-pointer">
                    <BrandItemCard key={index} brand={brand} />
                </div>
            ))}
        </div>
    );
};

export default BrandsList;