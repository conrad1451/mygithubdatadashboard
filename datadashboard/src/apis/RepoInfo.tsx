import { useEffect, useState } from "react";
import axios from "axios";  
// import {BasicTable, CustomTable} from "../MyTable";
import CustomTable from "../MyTable";
// const databaseId = process.env.CS_CONTENT;

import Button from '@mui/material/Button';
 
import Select from "@mui/joy/Select";

interface RepoInfo {
    name: string;
    url: string;
    description: string;
    stars: string;
    languagesURL: string; 
    languagesContent: string;
  }

  
  function BasicPie() {
    const [repos, setRepos] = useState<RepoInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dataSource = import.meta.env.VITE_DATA_SOURCE;
     
    const fetchData = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get(dataSource);
          const theData: RepoInfo[] = response.data;
          setRepos(theData);
      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
          setIsLoading(false);
      }
    }
    useEffect(() => {
      fetchData( );
    }, []);
  
  
    return (
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={200}
        height={200}
      />
    );
  }
  

  function DataDisplay(){
    const [repos, setRepos] = useState<RepoInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return(
    <div>
        {/* <Button onClick={handleSetTags}>Add to filtering</Button> */}
        <text>Tags included in filtering:</text>
        <CustomTable theRepos={repos} setRepos={setRepos} />
        </div>        
    )
  }
  export default DataDisplay;