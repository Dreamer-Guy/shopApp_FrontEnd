import SelectTimeButtons from "@/components/admin/Content/Revenues/SelectTimeButtons";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {getRevenueByType} from "@/store/revenue/index.js";
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
            <h1>Revenue Page</h1>
            <div className="flex flex-row justify-end items-center">
                <SelectTimeButtons typeOfRevenue={typeOfRevenue} setTypeOfRevenue={setTypeOfRevenue}
                    selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>
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