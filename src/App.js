import React, {Suspense, lazy} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const NavBar = lazy(() => import('./NavBar'))
const Recorder = lazy(() => import('./containers/RecorderForm'))
// const Home = lazy(() => import('./components/Home'))

function App() {
  return(
    <Router>
        <Suspense fallback = {<div>Loading...</div>}>
          <NavBar>
            <Route exact path='/recorder' component= { Recorder } />
          </NavBar>
        </Suspense>
    </Router>
  )
  
}

export default App;
