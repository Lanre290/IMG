interface ImageFile{
    file?:Blob | MediaSource | any;
    onClose?:any;
    style?:object;
}

function Image(data:ImageFile){
    const defaultStyle = {backgroundImage: `url('${URL.createObjectURL(data.file)}')`, maxHeight: '248px', minHeight: '248px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'};
    const styling = {...defaultStyle, ...data.style}
    return(
        <div 
          className= "bg-center bg-cover bg-no-repeat w-2/6 h-200 px-20 sm:h-200 sm:w-100 md:h-200 cursor-pointer sm:h-200 sm:w-1/4 md:h-200 md:w-1/6 rounded-xl border border-gray-500 border-dashed flex flex-col items-center justify-center relative" 
          style = {styling}
        >
            <button className="absolute top-4 right-4 px-4 py-2 cursor-pointer bg-transparent rounded-3xl text-red-700 text-3xl hover:bg-gray-700 hover:bg-opacity-40" onClick={data.onClose}>
                <i className="fa fa-trash"></i>
            </button>
        </div>
    )
}

export default Image;
