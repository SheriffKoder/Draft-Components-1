"use client"
import Image from "next/image";
import { useRef, useState } from "react";
import { ChangeEventHandler } from "react";

export default function Home() {

  const [pickedImage, setPickedImage ] = useState<any>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);

  const ImagePickerButton = () => {
    if (imageInput.current) imageInput.current.click();
  }

  const handleImageChange : ChangeEventHandler<HTMLInputElement> = (event) => {
      
    let file;
    if (event.target.files) file = event.target.files[0];
  
      // no file selected
      if (!file) {
          setPickedImage(null);
          return;
      }
  
      // convert the image file to a data url
      // FileReader is built in javascript
      const fileReader = new FileReader();
  
      // function that will be triggered by fileReader when readAsDataUrl is done
      fileReader.onload = () => {
          // access the data read url
          // and store it in the state
          setPickedImage(fileReader.result);
  
      };
  
      fileReader.readAsDataURL(file);
  
  }


  return (
    <div className="h-[100vh] flex items-center justify-center">

      <div className="w-[300px] h-[300px] relative">
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} fill alt="The image selected by the user"/>}
      </div>

      {/* // {/* hidden image input */}
      <input  type="file"
      accept="image/png, image/jpeg"
      ref={imageInput}  
      // multiple 
      onChange={handleImageChange} required 
      className="hidden"/>

      <button onClick={ImagePickerButton} className="bg-red-500 w-[100px] rounded-full text-center">
        Add image
      </button>




    </div>
  );
}
