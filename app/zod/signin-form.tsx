"use client";

// client-side live validation
// allows displaying and clearing errors as the user types

import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// npm install react-hook-form
// npm install @hookform/resolvers



//////////////////////////////////////////////////////
// ZOD SCHEMA
const schemaRegister = z.object({
  title: z.string()
    .min(3, { message: "Title must be between 3 and 20 characters" })
    .max(20, { message: "Title must be between 3 and 20 characters" }),
  content: z.string()
    .min(6, { message: "Content must be between 6 and 100 characters" })
    .max(100, { message: "Content must be between 6 and 100 characters" }),
});

// ZOD TYPE
type SchemaValues = z.infer<typeof schemaRegister>


//////////////////////////////////////////////////////



export function SigninForm() {


  // REACT HOOK FORM
  // here will use the ZOD TYPE
  // this will give us register, handleSubmit, watch, setValue, formState: { errors }
  // to have an errors object
  // register is a function that returns an object with the name of the field and the onChange handler
  // handleSubmit is a function that returns a function that will be called when the form is submitted
  // watch is a function that returns the value of the field
  // setValue is a function that sets the value of the field
  // formState: { errors } is an object that contains the errors
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SchemaValues>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  const [loading, setLoading] = useState(false);
  const [successBoxShadow, setSuccessBoxShadow] = useState(false);

  const onSubmit = async (data: SchemaValues) => {
    // console.log(data);

    setLoading(true);
    try {
      const response = await fetch('/api/zod', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();

      // console.log(responseData)
      if (response.ok) {
        setSuccessBoxShadow(true);
      }


    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="w-[400px] py-[2rem] flex flex-col gap-[1rem] items-center justify-center
      border border-zinc-700 rounded-lg bg-zinc-900"
      style={{ boxShadow: 
        errors.title ? '0 0 15px rgba(244, 63, 94, 0.5)' :
        successBoxShadow ? '0 0 15px rgba(52, 211, 153, 0.5)' :
        '0 0 15px rgba(59, 130, 246, 0.5)'
      }}>
         <h1>Create a new post</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1rem] items-center justify-center">

          <div className="form-control flex flex-col gap-[10px]">
            <label htmlFor="title" className="">Title</label>
            <input 
              {...register("title")}
              type="text" 
              id="title" 
              className="w-[300px] border px-[1rem] py-[0.5rem] border-zinc-400 rounded-lg bg-zinc-900"
            />
          </div>

          <p className="h-[1rem] text-xs text-[#ff1818] text-center">
            {errors.title && errors.title.message}
          </p>

          <div className="form-control flex flex-col gap-[10px]">
            <label htmlFor="content" className="">Content</label>
            <textarea 
            {...register("content")}
            id="content" rows={5} className="w-[300px] border px-[1rem] py-[0.5rem] border-zinc-400 rounded-lg bg-zinc-900" />

            <p className="h-[1rem] text-xs text-[#ff1818] text-center">
            {errors.content && errors.content.message}
            </p>

          </div>




          <div className="form-actions">
            <button type="submit" className="w-[300px] bg-blue-500 text-white px-[1rem] py-[0.5rem] rounded-full">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>

        </form>

      </div>
    </>
  );
}