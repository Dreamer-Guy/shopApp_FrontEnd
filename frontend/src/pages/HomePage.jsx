import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/user/userSlice';
import SearchBar from '../components/shopping/searchBar';
import ProductsGrid from '../components/shopping/productsGrid';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isSuccess } = useSelector((state) => state.user);

    // Add products state
    const [products] = useState([
        {
            name: "Sample Product 1",
            price: 99.99,
            salePrice: 79.99,
            rating: 4.5,
            totalStock: 10,
            image: "https://via.placeholder.com/150"
        },
        // Add more sample products as needed
    ]);

    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSearch = (searchTerm) => {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const headerStyle = {
        width: '100%',
        height: '60px',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        position: 'fixed',
        top: 0,
        left: 0,
        justifyContent: 'space-between'
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff',
        marginTop: '60px' // Add margin to account for fixed header
    };

    const buttonStyle = {
        padding: '8px 16px',  // Slightly smaller for header
        fontSize: '14px',
        backgroundColor: '#ffffff',
        color: '#000000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <>
            <header style={headerStyle}>
                <h1>My App</h1>
                <div className="flex items-center gap-4">
                    <SearchBar onSearch={handleSearch} />
                    {isSuccess ? (
                        <button 
                            style={buttonStyle}
                            onClick={handleLogout}
                        >
                            Profile
                        </button>
                    ) : (
                        <button 
                            style={buttonStyle}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    )}
                </div>
            </header>
            <div style={containerStyle}>
                <div className="container mx-auto px-4 py-8">
                    <ProductsGrid products={filteredProducts} />
                </div>
            </div>
        </>
    );
};

export default HomePage;