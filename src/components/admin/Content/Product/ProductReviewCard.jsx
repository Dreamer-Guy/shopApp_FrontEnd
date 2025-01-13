import { useNavigate } from 'react-router-dom';

const ProductReviewCard = ({ product }) => {
    const navigate = useNavigate();

    if (!product) {
        return null;
    }

    return (
        <div 
            onClick={() => navigate(`/admin/products-reviews/${product._id}`)}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <img 
                    src={product?.image || ''} 
                    alt={product?.name || 'Product image'}
                    className="w-16 h-16 object-cover rounded"
                />
                <div>
                    <h3 className="font-semibold">{product?.name || 'Unknown product'}</h3>
                    <p className="text-sm text-gray-600">
                        Rating: {product?.averageRating?.toFixed(1) || 'N/A'}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-medium">{product?.reviewCount || 0} Reviews</p>
                <p className="text-sm text-gray-600">
                    {product?.pendingReviews || 0} Pending
                </p>
            </div>
        </div>
    );
};

export default ProductReviewCard;
