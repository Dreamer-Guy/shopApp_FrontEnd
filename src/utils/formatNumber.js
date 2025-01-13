const NUMBER_OF_DECIMALS = 2;

const formatNumber = (number) => {
    const formatedNumber=number?.toFixed(NUMBER_OF_DECIMALS)
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    console.log(formatedNumber);
    return formatedNumber;
};

export default formatNumber;
