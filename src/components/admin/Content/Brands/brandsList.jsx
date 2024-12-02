import BrandItemCard from "./BrandItemCard";
import { useNavigate } from "react-router-dom";
const CategoriesList = ({ brands }) => {
    const navigate = useNavigate();
    console.log(brands);
    return (
        <div className="w-full flex flex-col items-between justify-center gap-3">
        {
            brands?.map((brand,index) => (
                <div
                key={index}
                onClick={() => navigate(`/admin/brands/detail/${brand._id}`)} 
                className="border border-black rounded-lg hover:cursor-pointer">
                    <BrandItemCard key={index} brand={brand} />
                </div>
            ))
        }
        </div>
    );
};

export default CategoriesList;