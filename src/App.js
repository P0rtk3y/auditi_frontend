import React, { Suspense, lazy } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getCurrentUser } from './actions/currentUser'
import Logout from './components/Logout'
import NavBar from './NavBar.js'
import { Route, Switch, withRouter } from 'react-router-dom'


// const NavBar = lazy(() => import('./NavBar'))
// const Recorder = lazy(() => import('./containers/RecorderForm'))
// const Login = lazy(() => import('./components/Login'))
// const Home = lazy(() => import('./components/Home'))

class App extends React.Component{

  componentDidMount(){
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {/* <Route exact path='/logout' component={Logout} />  */}
      </div>
    )
  }
  
}

export default withRouter(connect(null, {getCurrentUser})(App));
