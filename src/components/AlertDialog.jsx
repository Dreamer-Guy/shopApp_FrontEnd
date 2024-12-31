const AlertDiaglog = ({ open, setOpen=f=>f, title, content,continueFunction=f=>f }) => {
    return (
        <div className={`${open===true?'':'hidden'}`}>
            <div className="bg-black opacity-50 z-50 h-screen w-screen fixed inset-0"></div>
            <div className="flex flex-col gap-4 p-5 items-start z-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
                <h3 className="font-semibold text-lg">{title}</h3>
                <div>
                    {content}
                </div>
                <div className="flex flex-row gap-4 w-full justify-end">
                    <button onClick={()=>setOpen((pre)=>(false))} className="bg-white text-black border-black border p-2 rounded-md">Cancel</button>
                    <button onClick={()=>{
                        continueFunction();
                        setOpen((pre)=>(false));
                    }} className="bg-blue-500 text-white p-2 rounded-md">Continue</button>
                </div>
            </div>
        </div>
    );
};

export default AlertDiaglog;