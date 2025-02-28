import { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Fragment } from "react"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { X } from "lucide-react"

const ProductFilter = ({ filters, handleFilter, handleClearFilter }) => {
    const [filterOptions, setFilterOptions] = useState({
        Brand: [],
        Category: [],
        Price: [
            { id: "0-500", label: "$0 - $500" },
            { id: "500-1000", label: "$500 - $1000" },
            { id: "1000-1500", label: "$1000 - $1500" },
            { id: "1500-2000", label: "$1500 - $2000" },
            { id: "2500-3000", label: "$2500 - $3000" }
        ]
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilterOptions = async () => {
            setIsLoading(true);
            try {
                const [brandsResponse, categoriesResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/brands/all`, {
                        withCredentials: true
                    }),
                    axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/admin/categories/all`, {
                        withCredentials: true
                    })
                ]);

                setFilterOptions(prev => ({
                    ...prev,
                    Brand: brandsResponse.data.map(brand => ({
                        id: brand.name.toLowerCase(),
                        label: brand.name
                    })),
                    Category: categoriesResponse.data.map(category => ({
                        id: category.name.toLowerCase(),
                        label: category.name
                    }))
                }));
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilterOptions();
    }, []);

    const hasActiveFilters = filters && Object.keys(filters).some(key => filters[key].length > 0);

    if (isLoading) {
        return <div>Loading filters...</div>;
    }

    if (error) {
        return <div>Error loading filters: {error}</div>;
    }

    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">Filters</h2>
                {hasActiveFilters && (
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleClearFilter}
                        className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-4 h-4" />
                        Clear all
                    </Button>
                )}
            </div>
            <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem) => {
                    const sectionIdFormatted = keyItem === "Price" ? "priceRange" : keyItem.toLowerCase();
                    
                    return (
                        <Fragment key={keyItem}>
                            <div>
                                <h3 className="text-base font-bold">{keyItem}</h3>
                                <div className="grid gap-2 mt-2">
                                    {filterOptions[keyItem].map((option) => (
                                        <Label 
                                            key={option.id}
                                            className="flex font-medium items-center cursor-pointer gap-2">
                                            <Checkbox
                                                checked={
                                                    filters && 
                                                    Object.keys(filters).length > 0 &&
                                                    filters[sectionIdFormatted] &&
                                                    filters[sectionIdFormatted].indexOf(option.id) > -1
                                                }
                                                onCheckedChange={() => handleFilter(sectionIdFormatted, option.id)}
                                            />
                                            {option.label}
                                        </Label>
                                    ))}
                                </div>
                            </div>
                            <Separator/>
                        </Fragment>);
                })}
            </div>
        </div>
    )
}

export default ProductFilter;