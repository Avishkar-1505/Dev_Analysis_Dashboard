import AllAnalysis from './components/AllAnalysis'
import UserAnalysis from "./components/Useranalysis"
import { AppContext } from "./contexts/AppContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { apiUrl } from "./apiUrl";
import sampleData from './sample-data.json'
import Spinner from './components/Spinner';




function App() {

  const appContext = useContext(AppContext);

  
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const url = apiUrl

    if(url !== undefined){
        try{
            const result = await fetch(url)
            const data = await result.json()
            console.log(data)
            appContext?.setData(data.data)
        }
        catch(error){
            console.log("Error occured while fetching data")
            console.log(error)
        }
    }
    else{
      appContext?.setData(sampleData.data);
    }
    setLoading(false);
  }   

  useEffect( () => {
    fetchData();
    console.log(appContext?.data);
  }, [])
 
  
  

  return (
    <div className="bg-slate-900 h-full w-full ">
       <h1 className="flex justify-center items-center text-3xl font-bold text-white pb-5 pt-5 border-b-4">
          Dev Analytics Dashboard
        </h1>
        {
          loading ? <Spinner/> : (
            <div>
              <div className='text-white w-full pt-5 pb-10'>
                <AllAnalysis/>
              </div>
              <div className='text-white pt-5 pb-5 border-t-4'>
                <UserAnalysis/>
              </div>
            </div>
          )
        }
        
        

    </div>
  );
}

export default App;
