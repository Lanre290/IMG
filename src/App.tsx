import { useState } from "react";
import "./App.css";
import AddNewBtn from "./components/AddNew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "./components/Image";
import jsPDF from "jspdf";

function App() {
  const [images, setImages] = useState<any[]>([]);

  const handleChange = (event: Event | any) => {
    try {
      let arr = event.target.files;

      for (let index = 0; index < arr.length; index++) {
        const file:any = arr[index];
        if (file.size < 1) {
          toast.error("Invalid File.");
          throw new Error("Invalid file.");
        }
        if (!file.type.startsWith('image/')) {
          toast.error("Ensure to upload an image file.");
          throw new Error("Ensure to upload an image file.");
        }

        setImages((prevFiles:any[]) => [...prevFiles, file]);
      }

      event.target.value = null;
    } catch (eror) {
      // toast.error(error);
    }
  };

  const removeFile = (file: any) => {
    let dupImage = images;
    let index = dupImage.indexOf(file);
    setImages((prevFiles) => prevFiles.filter((file, i) => i !== index && file));
  };

  const compilePDF = () => {
    try {
      if(images.length == 0){
        toast.error('Can\'t compile empty image')
        throw new Error('Can\'t compile empty image')
      }

      const pdfFile = new jsPDF();

      images.forEach((image:any, index) => {
        const fileReader= new FileReader();
        fileReader.onloadend = (e:any) => {
          const base64Img = fileReader.result as string;

          const img = new window.Image();
          img.src = e.target.result as string;
          let width = 0;
          let height = 0;
          img.onload = () => {
            width = img.width;
            height = img.height;
          }


          if (index > 0) {
            pdfFile.addPage([210, 297]);
          } else {
            pdfFile.setPage(1);
          }

          pdfFile.addImage(base64Img, image.type.split("/")[1],0, 0, width, height )
          // pdfFile.addImage(base64Img, image.type.split("/")[1].toUpperCase(),0, 0, 210, 297)

          if(index === (images.length-1)){
            pdfFile.save('Document.pdf');
          }
        }
        fileReader.readAsDataURL(image);

      });
      pdfFile.save('Document.pdf');
    } catch (error) {
      // toast.error(error  )
    }
  }
  const imageStyle = {backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'};

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      ></link>
      <link
       rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css"
       ></link>


      <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-900 overflow-y-auto">
        <div className="flex flex-row flex-wrap justify-evenly w-full h-auto">
          <AddNewBtn onChange={handleChange}></AddNewBtn>
          {images.map((file, index) => (
            <Image
              file={file}
              key={index}
              onClose={() => {
                removeFile(file);
              }}
              style= {imageStyle}
            ></Image>
          ))}
        </div>

        <button
          className="w-4/6 bg-green-600 cursor-pointer p-4 mt-20 ml-50 text-gray-50 text-bold rounded-xl hover:bg-green-500 mb-10"
          style={{
            marginLeft: "calc(33%/2)",
            maxHeight: "248px",
            marginRight: "10px",
          }}
          onClick={compilePDF}
        >
          Convert to PDF
        </button>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

export default App;
