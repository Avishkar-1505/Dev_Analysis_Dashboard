import { useState } from "react";
import { createContext } from "react";

import sampleData from '../sample-data.json'

type AppContextType = {
    data : FetchedDataType | null;
    setData : React.Dispatch<React.SetStateAction<FetchedDataType>>;
}

type FetchedDataType = {
    
        AuthorWorklog: {
          activityMeta: ActivityMetaType[]; // Array of activity types
          rows: AuthorWorklogRowType[]; // Array of user worklog rows
        };
    
}

type ActivityMetaType = {
    label: string;
    fillColor: string;
}

type AuthorWorklogRowType = {
    name: string;
  totalActivity: {
    name: string; 
    value: string; 
  }[]; 
  dayWiseActivity: DayWiseActivityType[];
  activeDays: {
    days: number;
    isBurnOut: boolean;
    insight: string[];
  }
}

type DayWiseActivityType = {
    date: string;
    items: {
        children: DayActivityType[]
    }
}

type DayActivityType = {
    count: string;
    label: string;
    fillColor: string;
}


type AppContextProviderProps = {
    children: React.ReactNode
}

type TotalCounts = {
    [key: string]: number
}

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider({children}: AppContextProviderProps) {

    


    const [data, setData] = useState(sampleData.data);
    






    const value = {data, setData };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>


}

