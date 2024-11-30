
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };
 
    return (
        <div className="flex h-9 items-center space-x-2 bg-gray-100 rounded-full p-2 group 
        focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-300 shadow-md">
            <FaSearch className="text-black" />
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search..."
                className="border border-gray-300 p-2 rounded-full 
                focus:outline-none focus:border-none
                h-full bg-transparent border-none"
            />
        </div>
    );
};

export default SearchBar;
