import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css'
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
  });
  return (
    <div className="App">

      <ThemeProvider theme={theme}>
        <h1>Map app in React 🌟</h1>
        <MapComponent />
      </ThemeProvider>
    </div>
  );
}

export default App;
