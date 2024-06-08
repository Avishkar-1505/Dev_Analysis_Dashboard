import React, { useContext } from 'react'
import TypeVsCount from './TypeVsCount'
import DateVsCount from './DateVsCount'
import Headers from './Headers'
import { AppContext } from '../contexts/AppContext'

const AllAnalysis = () => {

  const appContext = useContext(AppContext)
  

  return (
    <div className="flex flex-col justify-center items-center">
        <h2 className='text-2xl pb-5'
        >All Devs Analytics</h2>
        <Headers/>
        <div className="flex justify-evenly h-full w-11/12 max-h-[70rem]">
          <div>
            <TypeVsCount/>
          </div>
          
          <div>
            <DateVsCount/>
          </div>
            
        </div>
        

    </div>
  )
}

export default AllAnalysis