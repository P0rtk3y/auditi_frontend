import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import NavBar from './containers/NavBar.js'
import Home from './components/Home'
import Bullhorn from './components/Bullhorn'
import Searchbar from './components/Searchbar'
import Recorder from './components/Recorder'
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
          <Route exact path="/bullhorn" component={ Bullhorn } />
          <Route exact path="/recorder" component={ Recorder } />
          <Route exact path="/searchbar" component={ Searchbar } />
        </div>
      </div>
    )
  }
  
}

export default withRouter(connect(null, {getCurrentUser})(App));
