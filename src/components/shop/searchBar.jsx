import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({ isOpen, onSearch }) => {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        const searchFromUrl = searchParams.get('search');
        if (searchFromUrl) {
            setSearchTerm(searchFromUrl);
        }
    }, [searchParams]);
    
    if (!isOpen) return null;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            onSearch('');
            return;
        }
        onSearch(searchTerm.trim());
    };
    
    return (
        <div className="w-full bg-transparent mx-auto border-b border-gray-200 transition-all duration-300">
            <div className="container mx-auto px-4 py-3">
                <form onSubmit={handleSubmit} className="flex h-8 w-1/2 items-center mx-auto space-x-2 bg-gray-100 rounded-full px-4
                    focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-300">
                    <button type="submit">
                        <FaSearch className="text-gray-400" />
                    </button>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search product..."
                        className="flex-1 bg-transparent border-none focus:outline-none h-full"
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
};

export default SearchBar;
