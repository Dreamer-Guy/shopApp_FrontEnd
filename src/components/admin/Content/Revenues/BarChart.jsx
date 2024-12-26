import { Bar } from "react-chartjs-2";

const BarChart=({title,chartData})=>{
    const options = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: title,
            },
        },
    };
    return (
        <div>
            <h2 className="font-bold text-lg">{title}</h2>
            <Bar data={chartData} options={options} />
        </div>
    )
}

export default BarChart;