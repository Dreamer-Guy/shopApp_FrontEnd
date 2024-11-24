import {FaStar} from "react-icons/fa";

const RatingStar = ({rating}) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={Math.floor(rating) > i ? "#f8b825" : "#e4e5e9"} />
            ))}
        </div>
    );
};

export default RatingStar;