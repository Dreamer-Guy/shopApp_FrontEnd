import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import RatingStar from "./ratingStar";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge"
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
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

  return (
    <Card className="w-full max-w-sm mx-auto">
        <div>
            <div className="relative cursor-pointer" onClick={handleClick}>
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