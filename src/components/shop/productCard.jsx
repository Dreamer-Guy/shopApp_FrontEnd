import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import RatingStar from "./ratingStar";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge"
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/store/cart/index.js";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import formatNumber from "@/utils/formatNumber";

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleClick = () => {
    if (!product) {
      console.error('Product data is missing');
      return;
    }

    const productData = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      salePrice: product.salePrice,
      brand: product.brand_id.name,
      category: product.category_id.name,
      totalStock: product.totalStock,
      description: product.description,
      rating: product.rating,
      numReviews: product.numReviews
    };

    console.log('Saving product data:', productData);
    navigate(`/shop/product/${product._id}`, { state: { productData } });
  };

    const handleAddToCart = async () => {
        try {
            setIsLoading(true);
            await dispatch(addItemToCart({
                productId: product._id,
                quantity: 1
            })).unwrap();

            toast({
                title: "Success",
                description: "Product added to cart successfully",
                className: "bg-green-500 text-white",
                duration: 3000
            });
        } catch (error) {
            toast({
                title: "Error", 
                description: error || "Could not add to cart",
                variant: "destructive",
                className: "bg-red-500 text-white",
                duration: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full h-[380px] max-w-sm mx-auto">
            <div className="flex flex-col h-full">
                <div className="relative h-[180px]">
                    <img 
                        src={product?.image} 
                        alt={product?.name}
                        className="w-full h-full object-contain rounded-t-lg cursor-pointer"
                        onClick={handleClick} 
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
                <div className="flex flex-col flex-1 p-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <h2 
                                    className="text-lg font-bold mb-2 line-clamp-2 h-[50px] cursor-pointer hover:text-blue-500" 
                                    onClick={handleClick}
                                >
                                    {product?.name}
                                </h2>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-[300px] break-words">{product?.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
                                ${formatNumber(product?.price)}
                            </span>
                            {product?.salePrice > 0 && (
                                <span className="text-lg font-semibold text-primary text-red-500">
                                    ${formatNumber(product?.salePrice)}
                                </span>
                            )}
                        </div>
                        <div className="mt-2">
                            <RatingStar rating={product?.rating} />
                        </div>
                    </div>
                    <CardFooter className="px-0 pb-0">
                        {product?.totalStock === 0 ? (
                            <Button className="w-full opacity-60 cursor-not-allowed">
                                Out Of Stock
                            </Button>
                        ) : (
                            <Button
                                onClick={handleAddToCart}
                                disabled={product.totalStock === 0 || isLoading}
                                className="w-full"
                            >
                                {isLoading ? "Adding..." : 
                                 product.totalStock === 0 ? "Out of Stock" : 
                                 "Add to Cart"}
                            </Button>
                        )}
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}

export default ProductCard;