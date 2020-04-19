import React, {Suspense, lazy} from 'react';
import { connect } from 'react-redux';
import './App.css';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

const NavBar = lazy(() => import('./NavBar'))
// const Home = lazy(() => import('./components/Home'))

function App() {
  return(
      <Suspense fallback = {<div>Loading...</div>}>
        <NavBar />
      </Suspense>
  )
  
}

export default App;
