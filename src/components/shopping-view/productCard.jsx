import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import RatingStar from "./ratingStar";

function ProductCard({ product }) {
  return (
    <div className="flex flex-col items-start gap-2">
        <div className="flex items-center text-xs">
            {product.totalStock > 0 ? (
            <div className="flex items-center gap-1 text-green-500">
                <FaCheckCircle />
                <span>In Stock</span>
            </div>
            ) : (
            <div className="flex items-center gap-1 text-red-500">
                <FaTimesCircle />
                <span>Out of Stock</span>
            </div>
            )}
        </div>

        <div>
            <img
            className="w-full h-36 object-cover"
            src={product.image}
            alt={product.name}
            />
        </div>

        {/* Rating */}
        <div>
            <RatingStar rating={product.rating} />
        </div>

        {/* Product name */}
        <div>
            <h2 className="text-lg font-bold">{product.name}</h2>
        </div>

        {/* Price */}
        <div>
            <h2
            className={`${
                product.salePrice > 0 ? "line-through text-gray-500" : ""
            } text-lg`}
            >
            ${product.price}
            </h2>
            {product.salePrice > 0 && (
            <h2 className="text-lg text-red-500">${product.salePrice}</h2>
            )}
        </div>
    </div>
  );
}

export default ProductCard;