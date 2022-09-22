import React from 'react'
import './App.css';
import Home from "./components/home/home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Scrumboard from './components/scrumboard/scrumboard';

import SignUp from './components/sign-up/sign-up';
import SignIn from './components/sign-in/sign-in';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/scrumboard' element={<Scrumboard/>} />

          </Routes>
        </BrowserRouter>
      </div>
    )
      
    
  }
}

export default App;
