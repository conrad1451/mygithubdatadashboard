import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import CustomTable from './MyTable'

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';

import JobNotionPages from './apis/JobNotionPages'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MyFormContainer from './apis/NewSubmission'
 
import axios from "axios";  


import './App.css'
interface RepoInfo {
  name: string;
  url: string;
  description: string;
  stars: string;
  languagesURL: string; 
}

function BasicPie() {
  const [repos, setRepos] = useState<RepoInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dataSource = import.meta.env.VITE_DATA_SOURCE;
   
  const fetchData = async (index: number) => {
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

function OldApp() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

// eslint@typescript-eslint/no-empty-object-type
// interface NavigationButtonsProps {}

// const NavigationButtons: React.FC<NavigationButtonsProps> = () => {
function NavigationButtons() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
      <Button variant="contained" onClick={() => handleNavigate('/orig')}>
        Go to original page
      </Button>
      <Button variant="contained" onClick={() => handleNavigate('/form')}>
        Go to form page
      </Button>
      <Button variant="contained" onClick={() => handleNavigate('/careercontent')}>
        Go to career content page
      </Button>
    </Box>
  );
};
 
function App() {
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<NavigationButtons />} />
        <Route path="/orig" element={<OldApp/>} />
        <Route path="/form" element={  <MyFormContainer/>} />
        <Route path="/careercontent" element={  <JobNotionPages/>} />
        {/* <Route path="/orig" element={ <CustomTable/>} /> */}
      </Routes>
    </Router>    
    </>
  )
}

export default App
