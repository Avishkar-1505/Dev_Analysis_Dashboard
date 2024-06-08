import React from 'react'



interface TaskCount {
    [task: string]: number;
}

interface userData {
    
    userData: TaskCount
}

const UserHeader:React.FC<userData> = ({userData}) => {

  return (
    <div>      
        {
            userData ? (
                <div className='flex gap-6 pb-6'>
                    {
                        Object.entries(userData).map(([task, count]) =>(
                            <div key={task} className='flex w-[10rem] flex-col justify-center items-center border-2 rounded-lg shadow-white hover:shadow-md'>
                                <div>{task} </div>
                                <div>{count}</div>
                            </div>
                        ))
                    }
                </div>
            ) :
            (
                <div>No user Found</div>
            )

        }

    </div>
  )
}

export default UserHeader