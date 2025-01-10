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
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleNavigateToProduct = () => {
        if (!product) return;

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
        <Card className="w-full max-w-sm mx-auto">
            <div className="flex flex-col justify-between h-full">
                <div className="relative cursor-pointer" onClick={handleNavigateToProduct}>
                    <img 
                        src={product?.image} 
                        alt={product?.name}
                        className="w-full h-auto object-cover rounded-t-lg" 
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
                <div>
                    <CardContent className="p-4">
                        <h2 
                            className="text-lg font-bold mb-2 overflow-hidden cursor-pointer hover:text-blue-600" 
                            onClick={handleNavigateToProduct}
                        >
                            {product?.name}
                        </h2>
                        <div className="flex justify-between items-center mb-2">
                            <span
                            className={`${
                                product?.salePrice > 0 ? "line-through" : ""
                            } text-lg font-semibold text-primary`}
                            >
                            ${product?.price}
                            </span>
                            {product?.salePrice > 0 ? (
                            <span className="text-lg font-semibold text-primary text-red-500">
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