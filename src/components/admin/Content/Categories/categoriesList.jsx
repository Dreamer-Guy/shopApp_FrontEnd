import CategoryItemCard from "./categoryItemCard";
import { useNavigate } from "react-router-dom";
const CategoriesList = ({ categories }) => {
    const navigate = useNavigate();
    return (
        <div className="divide-y divide-gray-100">
            {categories?.map((category, index) => (
                <div
                key={index}
                className="border border-black rounded-lg hover:cursor-pointer">
                    <CategoryItemCard key={index} category={category} />
                </div>
            ))}
        </div>
    );
};

export default CategoriesList;