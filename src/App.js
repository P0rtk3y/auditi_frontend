import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import NavBar from './NavBar.js'
import Recorder from './components/Recorder'
import Home from './components/Home'
import { Redirect, Route, withRouter } from 'react-router-dom'



class App extends React.Component{

  componentDidMount(){
    this.props.getCurrentUser()
    return <Redirect to="/" />
  }

  render() {
    return (
      <div className="App">
        <div className="navBar">
          <NavBar />
        </div>
        <div className="contentBody">
          <Route exact path="/" component={ Home } />
          <Route exact path="/recorder" component={ Recorder } />
        </div>
        {/* <Route exact path='/logout' component={Logout} />  */}
      </div>
    )
  }
  
}

export default withRouter(connect(null, {getCurrentUser})(App));
