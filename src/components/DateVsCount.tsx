import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface selectedUser {
    selectedName?: string
}

interface TaskCount {
    [task: string]: number;
}

interface userData {
    
    userData?: TaskCount
}



const DateVsCount: React.FC<selectedUser & userData> = (props) => {

  const appContext = useContext(AppContext);

  


  interface DateWiseTaskCount {
      [date: string]: TaskCount;
  }

  const dateWiseTaskCounts: DateWiseTaskCount = {};

  if(props.selectedName){
    if (appContext?.data?.AuthorWorklog.rows) {
        // Iterate through each row
        for (const row of appContext?.data?.AuthorWorklog.rows) {
            if(row.name === props.selectedName){
                for (const dayActivity of row.dayWiseActivity) {
                    const date = dayActivity.date;
    
                    // Initialize the date entry if it doesn't exist
                    if (!dateWiseTaskCounts[date]) {
                        dateWiseTaskCounts[date] = {};
                    }
    
                    // Iterate through each activity item in dayActivity.items.children
                    for (const item of dayActivity.items.children) {
                        const task = item.label;
                        const count = parseInt(item.count, 10);
    
                        // Update the count for the task on the specific date
                        if (dateWiseTaskCounts[date][task] !== undefined) {
                            dateWiseTaskCounts[date][task] += count;
                        } else {
                            dateWiseTaskCounts[date][task] = count;
                        }
                    }
                }
            }
        }
    }
  }
  else{
    if (appContext?.data?.AuthorWorklog.rows) {
      
        for (const row of appContext?.data?.AuthorWorklog.rows) {
            
            for (const dayActivity of row.dayWiseActivity) {
                const date = dayActivity.date;
  
                
                if (!dateWiseTaskCounts[date]) {
                    dateWiseTaskCounts[date] = {};
                }
  
                
                for (const item of dayActivity.items.children) {
                    const task = item.label;
                    const count = parseInt(item.count, 10);
  
                    
                    if (dateWiseTaskCounts[date][task] !== undefined) {
                        dateWiseTaskCounts[date][task] += count;
                    } else {
                        dateWiseTaskCounts[date][task] = count;
                    }
                }
            }
        }
    }
  }
  
  

  const [selectedTask, setSelectedTask] = useState<string>('Commits');
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const dates = Object.keys(dateWiseTaskCounts);
    if (dates.length > 0) {
        const counts = dates.map(date => dateWiseTaskCounts[date][selectedTask] || 0);
        setChartData({
            labels: dates,
            datasets: [
                {
                    label: selectedTask,
                    data: counts,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    color: 'white',
                },
            ],
        });
    }
  }, [selectedTask, props.selectedName, props.userData]);

  const handleTaskChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTask(event.target.value);
  };
  
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
        <h2 className='text-lg'>Date Vs Count</h2>
        <div>
            <label  className='text-white' htmlFor="taskDropdown">Select a task: </label>
            <select id="taskDropdown" className='bg-gray-400 text-black rounded-md' value={selectedTask} onChange={handleTaskChange}>
                {Object.keys(dateWiseTaskCounts[Object.keys(dateWiseTaskCounts)[0]]).map(task => (
                    <option key={task} value={task}>
                        {task}
                    </option>
                ))}
            </select>
        </div>
      
            {chartData.labels ? (
                <div className="chart-container ">
                    <Line className='h-[20rem]' data={chartData} options={{
                        responsive: true,
                        maintainAspectRatio: false, // Important to allow custom sizing
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: `Task Activity for ${selectedTask}`,
                                color: "white"
                            },
                        },
                        scales: {
                          x: {
                              ticks: {
                                  color: 'white', // Change x-axis text color
                              },
                          },
                          y: {
                              ticks: {
                                  color: 'white', // Change y-axis text color
                              },
                          },
                      },
                    }} />
                </div>
            ) : (
                <p>No data available for the selected task</p>
            )}
    </div>
  )
}

export default DateVsCount