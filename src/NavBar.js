import React from 'react'
import { Menu, Icon, Search, Button, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/Login'
import Logout from './components/Logout'
import './App.css';
import './images/userIcon.png';


const NavBar = ({currentUser, loggedIn}) => {

    return (
        <div className="navBar">
            <Menu secondary fixed="top" widths={4}>
                <Menu.Item><Icon size='huge' name='home' color='orange' /></Menu.Item>
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