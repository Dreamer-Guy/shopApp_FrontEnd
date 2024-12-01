import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailPage= () => {
    const { id } = useParams(); 
    const  {products} = useSelector((state) => state.product.products);  
    useEffect(() => { 
        const newProduct = products.find((product) => product._id === parseInt(1)); 
        setProduct(newProduct);
        const navigate = useNavigate();
        console.log(typeof(id));
    }, [id, products]);
;

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} />
      <p>${product.price}</p>
    </div>
    
  );
};

export default ProductDetailPage;
