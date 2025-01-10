const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3, // Ensure 3 decimal places
    maximumFractionDigits: 3, // Ensure 3 decimal places
  });
  
  const formatWithSpace = (number) => {
    // Format the number using Intl.NumberFormat
    const formatted = formatter.format(number);
    
    // Replace the default thousand separator (comma) with a space
    return formatted.replace(/,/g, ' ');
  };
  
  // Test cases
  //console.log(formatWithSpace(1000.3));  // Output: "$1 000.300"
  //console.log(formatWithSpace(1234567.89)); // Output: "$1 234 567.890"