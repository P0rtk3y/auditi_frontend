import React from 'react'
import { Menu, Icon, Search, Button, Modal, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import { changeSearchText } from './actions/searchbar'
import './images/userIcon.png';


const NavBar = ({loggedIn, changeSearchText, searchText}) => {

    const handleChange = e => {
        changeSearchText(e.target.value)
    }
  

    return (
        <div className="navBar">
            <Menu secondary fixed="top" widths={5}>
                <Menu.Item>
                  <Link to='/'><Icon size='huge' name='home' color='orange' /></Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to='/bullhorn'><Icon size='huge' name='bullhorn' color='pink' /></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/searchbar'>
                        <Search 
                          name='search' 
                          type='text' 
                          placeholder='Enter a tag, category, or source'
                          onSearchChange={handleChange}
                          value={searchText} 
                          showNoResults={false}
                          />           
                    </Link>
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

const mapStateToProps = ({currentUser, searchbar})=> {

  return {
    currentUser,
    loggedIn: !!currentUser,
    searchText: searchbar
  }
}


export default connect(mapStateToProps, {changeSearchText})(NavBar);