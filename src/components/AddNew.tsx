interface addImage{
    onChange?:Function | any;
}

function AddNewBtn(data:addImage){
    return(
        <div className="w-2/6 h-200 px-20 sm:w-100  sm:w-1/4 bg-transparent cursor-pointer sm:h-200 sm:w-100 md:h-200 md:w-1/6 rounded-xl border border-gray-500 border-dashed flex flex-col items-center justify-center hover:bg-gray-500 hover:bg-opacity-5 m-3 relative">
            <i className="fa fa-plus text-gray-600 text-6xl m-10"></i>
            <h3 className="text-xl text-center text-gray-300 mb-3">Add new File</h3>
            <input type="file" name="" id="" className="opacity-0 absolute top-0 bottom-0 right-0 left-0 cursor-pointer" accept="image/*" multiple={true} onChange={data.onChange}/>
        </div>
    )
}


export default AddNewBtn