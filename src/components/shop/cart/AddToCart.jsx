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
                title: "Thành công",
                description: "Đã thêm sản phẩm vào giỏ hàng",
            });
        } catch (error) {
            toast({
                title: "Thất bại",
                description: error || "Không thể thêm vào giỏ hàng",
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
                Thêm vào giỏ
            </Button>
        </div>
    );
};

export default AddToCart;
