import ProductCard from './components/shop/productCard';
import ProductsGrid from './components/shop/productGrid';
import ShoppingHeader from './components/shop/header';
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from 'react';
import formControls from './config/form';
import Form from './components/user/login';
import AppRoute from './routes/AppRoute';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from "./store/index.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const products = [
    {
      name: "Product 1",
      image: "https://via.placeholder.com/150",
      price: 100,
      salePrice: 80,
      rating: 4,
      totalStock: 0,
    },
    {
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      price: 120,
      salePrice: 90,
      rating: 4.5,
      totalStock: 0,
    },
    {
      name: "Product 3",
      image: "https://via.placeholder.com/150",
      price: 150,
      salePrice: 120,
      rating: 3.8,
      totalStock: 0,
    },
    {
      name: "Product 4",
      image: "https://via.placeholder.com/150",
      price: 200,
      salePrice: 160,
      rating: 5,
      totalStock: 0,
    },
    {
      name: "Product 5",
      image: "https://via.placeholder.com/150",
      price: 80,
      salePrice: 70,
      rating: 3.5,
      totalStock: 0,
    },
    {
      name: "Product 6",
      image: "https://via.placeholder.com/150",
      price: 50,
      salePrice: 40,
      rating: 4.2,
      totalStock: 10,
    },
    {
      name: "Product 7",
      image: "https://via.placeholder.com/150",
      price: 300,
      salePrice: 250,
      rating: 4.8,
      totalStock: 10,
    },
    {
      name: "Product 8",
      image: "https://via.placeholder.com/150",
      price: 400,
      salePrice: 350,
      rating: 4.9,
      totalStock: 10,
    },
    {
      name: "Product 9",
      image: "https://via.placeholder.com/150",
      price: 90,
      salePrice: 75,
      rating: 4,
      totalStock: 10,
    },
    {
      name: "Product 10",
      image: "https://via.placeholder.com/150",
      price: 60,
      salePrice: 50,
      rating: 3.7,
      totalStock: 10,
    },
  ];

  return (
    <Provider store={store}>
      <AppRoute/>
      
      {/* <ShopHeader/>
      <div className='w-3/4'>
          <ProductsGrid products={products}/>
      </div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <Button>Click me</Button>
      </div> */}
      <Toaster/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </Provider>
  )
}

export default App
