import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import RatingStar from "./ratingStar";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge"
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ProductCard({ product }) {
  return (
    // <div className="flex flex-col items-start gap-2">
    //     <div className="flex items-center text-xs">
    //         {product.totalStock > 0 ? (
    //         <div className="flex items-center gap-1 text-green-500">
    //             <FaCheckCircle />
    //             <span>In Stock</span>
    //         </div>
    //         ) : (
    //         <div className="flex items-center gap-1 text-red-500">
    //             <FaTimesCircle />
    //             <span>Out of Stock</span>
    //         </div>
    //         )}
    //     </div>

    //     <div>
    //         <img
    //         className="w-full h-36 object-cover"
    //         src={product.image}
    //         alt={product.name}
    //         />
    //     </div>

    //     {/* Rating */}
    //     <div>
    //         <RatingStar rating={product.rating} />
    //     </div>

    //     {/* Product name */}
    //     <div>
    //         <h2 className="text-lg font-bold">{product.name}</h2>
    //     </div>

    //     {/* Price */}
    //     <div>
    //         <h2
    //         className={`${
    //             product.salePrice > 0 ? "line-through text-gray-500" : ""
    //         } text-lg`}
    //         >
    //         ${product.price}
    //         </h2>
    //         {product.salePrice > 0 && (
    //         <h2 className="text-lg text-red-500">${product.salePrice}</h2>
    //         )}
    //     </div>
    // </div>
    
    <Card classname="w-full max-w-sm mx-auto">
        <div>
            <div className="relative">
                <img 
                    src={product?.image} 
                    alt={product?.name}
                    className="w-full h-[300px] object-cover rounded-t-lg" 
                />
                {product?.totalStock > 0 ? (
                    <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                        In Stock
                    </Badge>
                ) : (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        Out of Stock
                    </Badge>
                )}
                {product?.salePrice > 0 ? (
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                        Sale
                    </Badge>
                ) : null}
            </div>
            
            <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span
                    className={`${
                        product?.salePrice > 0 ? "line-through" : ""
                    } text-lg font-semibold text-primary`}
                    >
                    ${product?.price}
                    </span>
                    {product?.salePrice > 0 ? (
                    <span className="text-lg font-semibold text-primary">
                        ${product?.salePrice}
                    </span>
                    ) : null}
                </div>
                <div className="mt-2">
                    <RatingStar rating={product?.rating} />
                </div>
            </CardContent>
            <CardFooter>
                {product?.totalStock === 0 ? (
                    <Button className="w-full opacity-60 cursor-not-allowed">
                        Out Of Stock
                    </Button>
                    ) : (
                    <Button className="w-full">
                        Add to Cart
                    </Button>
                )}
            </CardFooter>
        </div>
    </Card>
  );
}

export default ProductCard;