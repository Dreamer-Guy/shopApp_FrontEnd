const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

const formatNumber = (number) => {
  const formatted = numberFormatter.format(number);
  return formatted.replace(/,/g, ' ');
};

const formatCurrency = (number) => {
  const formatted = currencyFormatter.format(number);
  return formatted.replace(/,/g, ' ');
};

// Export both functions
//use
//console.log(formatNumber(1234567.89));  // "1 234 567.890"
//console.log(formatCurrency(1234567.89)); // "$1 234 567.890"
export { formatNumber, formatCurrency };