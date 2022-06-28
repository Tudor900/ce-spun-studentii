import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './shared/components/Home';
import Admin from './shared/components/Admin';
import FlashRound from './shared/components/FlashRound';

export const RealtimeData = React.createContext({});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/flash' element={<FlashRound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
