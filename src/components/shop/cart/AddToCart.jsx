import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/store/cart/index.js';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AddToCart = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const handleAddToCart = async () => {
        try {
            await dispatch(addItemToCart({
                productId: product._id,
                quantity: Number(quantity)
            })).unwrap();

            toast({
                title: "Success",
                description: "Product added to cart successfully",
            });
        } catch (error) {
            toast({
                title: "Failed",
                description: error || "Could not add to cart",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <Input
                type="number"
                min="1"
                max={product.totalStock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-20"
            />
            <Button 
                onClick={handleAddToCart}
                disabled={product.totalStock === 0}
            >
                Add to Cart
            </Button>
        </div>
    );
};

export default AddToCart;
