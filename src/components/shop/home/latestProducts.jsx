import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../productCard';
import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LatestProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/latest`,
                    { 
                        params: { limit: 10 },
                        withCredentials: true 
                    }
                );
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching latest products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestProducts();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6 ml-2">Latest Products</h2>
                <div className="animate-pulse h-[300px] bg-gray-200 rounded-lg"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6 ml-2">
                Latest Products
            </h2>
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 }
                    }}
                    className="h-[450px] products-swiper"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product._id} className="flex h-full items-center justify-center">
                            <div className="w-full h-full p-4">
                                <ProductCard product={product} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default LatestProducts;
