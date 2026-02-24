import { Loader } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className=' w-full h-[60vh] flex justify-center items-center'>
        <Loader className=' w-28 h-28 animate-spin'/>
    </div>
  )
}

export default loading