import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getCurrentUser } from './actions/currentUser'
import NavBar from './NavBar.js'
import { Route, Switch, withRouter } from 'react-router-dom'


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
