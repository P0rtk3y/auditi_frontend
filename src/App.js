import React, { Suspense, lazy } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

const NavBar = lazy(() => import('./NavBar'))
const Recorder = lazy(() => import('./containers/RecorderForm'))
const Login = lazy(() => import('./components/Login'))
// const Home = lazy(() => import('./components/Home'))

class App extends React.Component{

  render() {
    return(
        <Suspense fallback = {<div>Loading...</div>}>
          <NavBar />
          <Switch>
            {/* <Route exact path='/recorder' component= { Recorder } /> */}
            {/* <Route exact path='/login' component = { Login } /> */}
          </Switch>
        </Suspense>
    )
    }
  
}

export default App;
