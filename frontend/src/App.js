import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import JournalPage from './components/JournalPage';
import SignUp from './components/SignUp';



function App() {
  return (
    <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/JournalPage" element={<JournalPage/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>

              </Routes>
            </BrowserRouter>
          );
}

export default App;