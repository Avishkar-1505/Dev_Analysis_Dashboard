import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const Headers = () => {

  const appContext = useContext(AppContext)

  
  
  const totalCounts: { [key: string]: number } = {};

  if (appContext?.data?.AuthorWorklog.rows && totalCounts) {
      
    for (const row of appContext?.data?.AuthorWorklog.rows) {
        
        for (const activity of row.totalActivity) {
            const activityName = activity.name;
            const activityValue = parseInt(activity.value, 10);

            
            if (totalCounts[activityName] !== undefined) {
                totalCounts[activityName] += activityValue;
            } else {
                totalCounts[activityName] = activityValue;
            }
        }
    }
  }

 


  return (
    <div>
        
        
        {
            totalCounts ? (
                <div className='flex gap-6 pb-6'>
                    {
                        Object.entries(totalCounts).map(([task, count]) =>(
                          <div key={task} className='flex w-[10rem] flex-col justify-center items-center border-2 rounded-lg shadow-white hover:shadow-md'>
                            <div >{task}</div>
                            <div>{count}</div>
                          </div>
                            
                        ))
                    }
                </div>
            ) :
            (
                <div>No Data Found</div>
            )

        }

        
        
        

    </div>
    
  )
}

export default Headers