import React,{useState, useContext, useEffect} from 'react'
import { AppContext } from '../contexts/AppContext'
import UserHeader from './UserHeader'

import DateVsCount from './DateVsCount'
import TypeVsCount from './TypeVsCount'

const Useranalysis = () => {

  const appContext = useContext(AppContext);

    interface TaskCount {
        [task: string]: number;
    }
    
    interface UserWiseTaskCount {
      [user: string]: TaskCount;
    }

    const userWiseTaskCounts: UserWiseTaskCount = {};

    if (appContext?.data?.AuthorWorklog.rows){
        for (const row of appContext?.data?.AuthorWorklog.rows){
            const name = row.name;
            if(!userWiseTaskCounts[name]){
                userWiseTaskCounts[name] = {};
            }
            for(const totalActivity of row.totalActivity){
                const task = totalActivity.name;
                const count = parseInt(totalActivity.value, 10);

                if(userWiseTaskCounts[name][task] !== undefined){
                    userWiseTaskCounts[name][task] += count;
                }
                else{
                    userWiseTaskCounts[name][task] = count;
                }
            } 
        }
    }

    

    
    const [selectedName, setSelectedName] = useState<string>(Object.keys(userWiseTaskCounts)[0]);
    const [userData, setUserData] = useState<TaskCount>({});
    

    const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedName(event.target.value);
    };

    useEffect(() => {
      const values = userWiseTaskCounts[selectedName];
      setUserData(values);
    },[selectedName])


  return (
    <div className='flex flex-col justify-center items-center'>
        <h2 className='text-2xl pb-5'>Individual Dev Analysis</h2>
        <div className='text-lg pb-5'>  
            <label  className='text-white ' htmlFor="taskDropdown">Select a user: </label>
            <select id="taskDropdown" className='bg-gray-400 text-black rounded-md' value={selectedName} onChange={handleNameChange}>
                {Object.keys(userWiseTaskCounts).map(name => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
        
        <UserHeader userData={userData} />
        <div className='flex justify-evenly h-full w-11/12 max-h-[70rem]'>
          <div>
            <TypeVsCount selectedName={selectedName} userData={userData}/>
          </div>
          <div>
              <DateVsCount selectedName={selectedName} userData={userData}/>
          </div>
        </div>
        
        
    </div>
  )
}

export default Useranalysis