

const TYPE_OF_REVENUE =[
    "Daily",   
    "Monthly",
    "Yearly",
];

const SelectTimeButtons = ({typeOfRevenue,setTypeOfRevenue=f=>f,selectedTime, setSelectedTime=f=>f}) => {
    return (
        <div className="flex flex-row gap-5 justify-center items-center">   
            <div>
                <label className="mr-2 font-semibold">Type of Revenue: </label> 
                <select className="border border-gray-300 rounded-md p-1" value={typeOfRevenue} onChange={(e) => setTypeOfRevenue(e.target.value)}>
                    {TYPE_OF_REVENUE.map((item,index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="mr-2 font-semibold">From: </label>
                <input
                    value={selectedTime}
                    onChange={(e)=>{
                        e.preventDefault();
                        setSelectedTime(pre=>(e.target.value));
                    }}
                    className="border border-gray-300 rounded-md p-1" 
                    type="date" />
            </div>
        </div>
    );
};

export default SelectTimeButtons;