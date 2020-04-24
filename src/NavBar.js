import React from 'react'
import { Menu, Icon, Search, Button, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Recorder from './components/Recorder'
import './App.css';
import './images/userIcon.png';


const NavBar = ({currentUser, loggedIn}) => {

    return (
        <div className="navBar">
            <Menu secondary fixed="top" widths={4}>
                <Menu.Item>
                  <Link to='/'><Icon size='huge' name='home' color='orange' /></Link>
                </Menu.Item>
                <Menu.Item>
                    <Search category />
                </Menu.Item>
                <Menu.Item>
                  <Link to='/recorder' ><Icon size='huge' name='microphone' color='olive' /></Link>
                </Menu.Item>
                <Menu.Item className='loginButtons'>
                  {loggedIn ? 
                        <Logout />
                          :
                        <Button.Group>
                          <Modal
                              size='small' 
                              dimmer='blurring' 
                              trigger={
                                  <Button color='teal' className='loginButton' fluid>
                                      <Link to='/login'>Login</Link>
                                  </Button>} 
                              closeIcon>
                              <Modal.Content> 
                                  <Login /> 
                              </Modal.Content>
                          </Modal>
                          <Button.Or />
                          <Modal
                              size='small' 
                              dimmer='blurring' 
                              trigger={
                                  <Button color='green' className='loginButton' fluid>
                                      <Link to='/signup'>Signup</Link>
                                  </Button>} 
                              closeIcon>
                              <Modal.Content> 
                                  <Signup /> 
                              </Modal.Content>
                          </Modal>
                        </Button.Group>   
                  }
                </Menu.Item>
            </Menu>
        </div>

    )

}

const mapStateToProps = ({currentUser}) => {
  return {
    currentUser,
    loggedIn: !!currentUser
  }
}


export default connect(mapStateToProps)(NavBar);