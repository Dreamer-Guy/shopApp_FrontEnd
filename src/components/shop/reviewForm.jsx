import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from "@/store/review/review-slice.js";
import { useParams } from 'react-router-dom';

const ReviewForm = ({ onSubmit }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (!comment.trim()) {
            setError('Please write a review comment');
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit({
                rating,
                comment: comment.trim(),
                productId: id
            });

            // Only clear form if submission was successful
            setComment('');
            setRating(0);
            setError('');
        } catch (err) {
            console.error('Review submission error:', err);
            setError(err.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                        disabled={isSubmitting}
                    >
                        <StarIcon
                            className={`w-6 h-6 ${
                                star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                        />
                    </button>
                ))}
            </div>
            
            <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                className="min-h-[100px]"
                disabled={isSubmitting}
            />
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className='w-full flex flex-row justify-center'>
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-1/2 rounded-lg p-2 ${
                        isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-black text-white hover:scale-110 transform transition'
                    }`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </div>
        </div>
    );
};

export default ReviewForm;