import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Fragment, useEffect } from "react"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFilterOptions } from "@/store/shop/product/filterOptionsSlice"

function ProductFilter({ filters, handleFilter, handleClearFilter }) {
  const dispatch = useDispatch();
  const { filterOptions, isLoading } = useSelector((state) => state.filterOptions);

  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

  // const handleClearFilters = () => {
  //   const filtersToRemove = [];
    
  //   Object.keys(filters).forEach(sectionId => {
  //       if (sectionId === 'search') return;
        
  //       if (filters[sectionId] && Array.isArray(filters[sectionId]) && filters[sectionId].length > 0) {
  //           filters[sectionId].forEach(optionId => {
  //               filtersToRemove.push([sectionId, optionId]);
  //           });
  //       }
  //   });
    
  //   filtersToRemove.forEach(([sectionId, optionId]) => {
  //       handleFilter(sectionId, optionId);
  //   });
  // };

  const hasActiveFilters = filters && Object.keys(filters).some(key => filters[key].length > 0);

  if (isLoading) {
    return <div>Loading filters...</div>;
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