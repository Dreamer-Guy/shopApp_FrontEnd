import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { useDispatch,useSelector} from 'react-redux';
import {addReview} from "@/store/review/review-slice.js";
import { useParams } from 'react-router-dom';



const ReviewForm = ({ productId, onReviewSubmitted }) => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const initReviewData={
        rating:0,
        comment:"",
        productId:id,
    }
    const [reviewData,setReviewData]=useState(initReviewData);
    const {isLoading,error}=useSelector(state=>state.review);
    const setRating=(rating)=>{
        setReviewData((pre)=>({...pre,rating}));
    }
    const setComment=(comment)=>{
        setReviewData((pre)=>({...pre,comment}));
    };
    const handleSubmit = async (e) => {
        console.log("here");
        e.preventDefault();
        if (reviewData.rating === 0) {
            setError('Please select a rating');
            return;
        }
        dispatch(addReview(reviewData));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star,index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                >
                    <StarIcon
                    className={`w-6 h-6 ${
                        star <= reviewData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                    />
                </button>
                ))}
            </div>
            
            <Textarea
                value={reviewData.comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                className="min-h-[100px]"
            />
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className='w-full flex flex-row justify-center'>
                <button 
                    onClick={(e)=>{handleSubmit(e)}}
                    disabled={isLoading}
                    className="w-1/2 hover:cursor-pointer transform transition hover:scale-110 rounded-lg bg-black text-white p-2"
                    >
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
            </div>
        </div>
    );
};

export default ReviewForm;