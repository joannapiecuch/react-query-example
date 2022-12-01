import React from 'react';
import './App.css';
import {
  Characters,
  CharacterDetails,
  CharactersInfinityScroll,
  AppMenu
} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppMenu />
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/infinity" element={<CharactersInfinityScroll />} />
          <Route
            path="/character/:characterId"
            element={<CharacterDetails />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
