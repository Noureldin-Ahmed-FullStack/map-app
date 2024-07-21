import React from 'react';
import logo from './logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css'
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
  });
  return (
    <div className="App MyBackground">

      <ThemeProvider theme={theme}>
        
      <ToastContainer />
        <h1 className='mt-3 playwrite'>Map app in React</h1>
        <MapComponent />
      </ThemeProvider>
    </div>
  );
}

export default App;
