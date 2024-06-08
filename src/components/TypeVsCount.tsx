import React, { useContext, useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AppContext } from '../contexts/AppContext';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface selectedUser {
    selectedName?: string
}

interface TaskCount {
    [task: string]: number;
}

interface userData {
    
    userData?: TaskCount
}

const TypeVsCount: React.FC<selectedUser & userData> = (props) => {

  const appContext = useContext(AppContext);
  
  const totalCounts: { [key: string]: number } = {};




  if (appContext?.data?.AuthorWorklog.rows) {
      
      for (const row of appContext.data.AuthorWorklog.rows) {
          
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


  


  const [selectedDate, setSelectedDate] = useState<string>('All');
  const [chartData, setChartData] = useState<any>({});

  

  useEffect(() => {
    if (selectedDate !== "All") {
        const taskCounts = dateWiseTaskCounts[selectedDate];

        const labels = Object.keys(taskCounts);
        const values = Object.values(taskCounts);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Task Counts',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 200, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                },
            ],
        });
    }
    else{
      if(props.userData){
        const labels = Object.keys(props.userData);
          const values = Object.values(props.userData);
    
          setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Task Counts',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    color: 'white'
                },
            ],
          });
      }
      else{
        const labels = Object.keys(totalCounts);
      const values = Object.values(totalCounts);

      setChartData({
        labels: labels,
        datasets: [
            {
                label: 'Task Counts',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                color: 'white'
            },
        ],
      });
      }
      
    }
  }, [selectedDate, props.selectedName, props.userData]);


  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  
   


  return (

    <div className='flex flex-col justify-center items-center gap-4'>
       <h2 className='text-lg'>Task Activity Vs Count</h2>
       <div>
            <label className='text-white' htmlFor="dateDropdown">Select a date: </label>
            <select className='bg-gray-400 text-black rounded-md ' id="dateDropdown" value={selectedDate} onChange={handleDateChange}>
              <option  value="All">All</option>
                {Object.keys(dateWiseTaskCounts).map(date => (
                    <option key={date} value={date}>
                        {date}
                    </option>
                ))}
            </select>
       </div>
        

            {chartData.labels ? (
                <div id="chartContainer">
                    <Bar className='h-[20rem]' data={chartData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    color: 'white', // Change legend text color
                                }
        
                            },
                            title: {
                                display: true,
                                text: `Task Activity for ${selectedDate}`,
                                color: 'white'
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
                <p>No data available for the selected date</p>
            )}

    </div>
  )
}

export default TypeVsCount