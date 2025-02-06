import { NextResponse } from 'next/server'
import * as z from "zod"

// input revalidation
// re-create the schema as in the client to check the data
const postSchema = z.object({
    title: z.string()
      .min(3, { message: "Title must be between 3 and 20 characters" })
      .max(20, { message: "Title must be between 3 and 20 characters" }),
    content: z.string()
      .min(6, { message: "Content must be between 6 and 100 characters" })
      .max(100, { message: "Content must be between 6 and 100 characters" }),
  });

export async function POST(request: Request) {
  try {
    // Get the JSON data from the request
    const data = await request.json();

    // "Validate" the JSON data against the schema
    const validatedFields = postSchema.safeParse({
      title: data.title,   
      content: data.content,
    });

    // console.log(validatedFields)

    // If the validation fails, return an error response
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    
    // Log the validated data
    // console.log('Received data:', validatedFields.data)
    
    // Return success response with the validated data
    return NextResponse.json(
      { 
        message: 'Data received successfully',
        data: validatedFields.data 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing form data:', error)
    return NextResponse.json(
      { error: 'Failed to process form data' },
      { status: 500 }
    )
  }
}
