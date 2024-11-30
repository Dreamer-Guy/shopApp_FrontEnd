import { FaTrash } from "react-icons/fa";

const ViewCategoryTypicals = ({ categoryTypicals }) => {
    return (
        <div className="flex flex-col gap-3 mt-4">
            {
                categoryTypicals.map((categoryTypical,index) =>(
                    <div className="flex flex-row justify-center items-center gap-4">
                        <div 
                        className="w-5/6 flex flex-row justify-between items-center border border-black rounded-lg p-2"
                        key={index}>
                            <p>{categoryTypical.name}</p>
                            <p className="w-2/5">{categoryTypical.description}</p>
                        </div>
                        <div>
                            <FaTrash className="hover:cursor-pointer"/>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ViewCategoryTypicals;