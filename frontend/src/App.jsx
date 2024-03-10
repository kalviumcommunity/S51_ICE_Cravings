import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/home';
import IceForm from './Component/IceForm';
import IceVarietyForm from './Component/IceVarietyForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path='/form' element={<IceForm/>}></Route>
        <Route path='/form/:id'element={<IceVarietyForm/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;