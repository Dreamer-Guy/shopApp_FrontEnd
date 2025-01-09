import SelectTimeButtons from "@/components/admin/Content/Revenues/SelectTimeButtons";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {getRevenueByType,getMetrics} from "@/store/revenue/index.js";
import BarChart from "@/components/admin/Content/Revenues/BarChart";
import Chart from "chart.js/auto";
import {CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initTypeOfRevenue="Yearly";
const DEFAULT_TIME_RANGE=3;

const RevenuesPage = () => {
    const dispatch=useDispatch();
    const toast=useToast();
    const {label,revenue}=useSelector(state=>state.revenue);
    const {totalOrders,totalRevenue,totalPurchasedProducts,totalCustomers}=useSelector(state=>state.revenue);
    const [typeOfRevenue,setTypeOfRevenue]=useState(initTypeOfRevenue);
    const currentDate=new Date();
    const [selectedTime,setSelectedTime]=useState(
        new Date(currentDate.getFullYear()-DEFAULT_TIME_RANGE,currentDate.getMonth(),currentDate.getDate())
        .toISOString().split("T")[0]);
    useEffect(()=>{
        const currentDate=new Date(selectedTime);
        const startTime={
            year:currentDate.getFullYear(),
            month:currentDate.getMonth(),
            day:currentDate.getDate(),
        };
        dispatch(getRevenueByType({type:typeOfRevenue,start:startTime}));
        dispatch(getMetrics({type:typeOfRevenue,start:startTime}));
    },[typeOfRevenue,selectedTime]);
    const chartDataCount={
        labels:label,
        datasets:[{
            label:`${typeOfRevenue} Revenue`,
            data:revenue.map(item=>item.count),
            backgroundColor:"rgba(75,192,192,1)",
            borderColor:"black",
            borderWidth:2,
        }],
    };
    const chartDataTotal={
        labels:label,
        datasets:[{
            label:`${typeOfRevenue} Revenue`,
            data:revenue.map(item=>item.total),
            backgroundColor:"rgba(75,192,192,1)",
            borderColor:"black",
            borderWidth:2,
        }],
    };
    return (
        <div>
            <h2 className="font-bold text-2xl">Revenue Page</h2>
            <div className="flex flex-row justify-end items-center">
                <SelectTimeButtons typeOfRevenue={typeOfRevenue} setTypeOfRevenue={setTypeOfRevenue}
                    selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-5 pr-10 gap-3 md:gap-1">
                <div className="w-4/5 md:w-1/5 border border-black rounded-lg p-2 font-semibold text-xl bg-green-300">
                    <h3>Total orders</h3>
                    <p>{totalOrders}</p>
                </div>
                <div className="w-4/5 md:w-1/5 border border-black rounded-lg p-2 font-semibold text-xl bg-blue-400">
                    <h3>Purchased items</h3>
                    <p>{totalPurchasedProducts}</p>
                </div>
                <div className="w-4/5 md:w-1/5 border border-black rounded-lg p-2 font-semibold text-xl bg-purple-400">
                    <h3>Joined Customers</h3>
                    <p>{totalCustomers}</p>
                </div>
                <div className="w-4/5 md:w-1/5 border border-black rounded-lg p-2 font-semibold text-xl bg-yellow-400">
                    <h3>Total Revenue</h3>
                    <p>{totalRevenue}</p>
                </div>
            </div>
            <div>
                <BarChart title="Number of order(s)" chartData={chartDataCount}/>
            </div>
            <div>
                <BarChart title="Total Revenue($)" chartData={chartDataTotal}/>
            </div>
        </div>
    );
};

export default RevenuesPage;