"use client"
import React from 'react'

import { useFormStatus } from "react-dom";

const FormSubmit = () => {

    const status = useFormStatus(); // this component must be within a <form> tag

    if (status.pending) {
        return <p>Creating post...</p>
    }

    return (
        <>
            <button type="reset" className='px-2 py-1 rounded-full border'>Reset</button>
            <button className='px-2 py-1 rounded-full border'>Create Post</button>
        </>
    )
}

export default FormSubmit