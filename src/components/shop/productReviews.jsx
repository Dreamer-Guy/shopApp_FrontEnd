import React from 'react';

  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const ProductReviews = ({ reviews }) => {
    console.log(reviews);
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString();
    };
  
    const getInitials = (name) => {
      if (!name) return '?';
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };
  
    return (
      <div className="space-y-6">
        {reviews.map((review, index) => {
          const userName = review?.userId?.fullName || 'Anonymous';
          const userAvatar = review?.userId?.avatar;
  
          return (
            <div key={index} className="border-b pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-gray-600">
                      {getInitials(userName)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">{userName}</h4>
                  <div className="flex items-center gap-4">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          );
        })}
        {reviews.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    );
  };

  export default ProductReviews;