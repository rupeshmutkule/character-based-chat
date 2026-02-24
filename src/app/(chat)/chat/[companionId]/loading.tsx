import { Loader } from 'lucide-react'
import React from 'react'

const loading = () => {
    return (
        <div className=' w-full h-screen flex justify-center items-center'>
            <Loader className=' w-40 h-40 animate-spin' />
        </div>
    )
}

export default loading