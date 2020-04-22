import React, { PureComponent } from 'react';
import { Menu, Icon, Search, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Login from './components/Login'
import './App.css';
import './images/userIcon.png';


class NavBar extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      deviceWidth: window.innerWidth
    }
  }

  //resizes based on device type
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ deviceWidth: window.innerWidth });
  }

  render(){
    let isMobile
    const setWidth = this.state.deviceWidth
    setWidth <= 750 ?  isMobile = true : isMobile = false


    let resizedIcon
    let navType
    if (isMobile) {
      resizedIcon = "small"
      navType = "navMobile"
    } else {
      resizedIcon = "huge"
      navType = "navDesktop"
    }
    

    return (
        <div className={navType}>
            <Menu secondary fixed="top" widths={4}>
                <Menu.Item><Icon size={resizedIcon} name='home' color='orange' /></Menu.Item>
                <Menu.Item>
                    <Search category />
                </Menu.Item>
                <Menu.Item>
                    <Link to='/recorder' ><Icon size={resizedIcon} name='microphone' color='olive' /></Link>
                </Menu.Item>
                <Menu.Item>
                    <Button.Group>
                        <Modal
                            size='small' 
                            dimmer='blurring' 
                            trigger={<Button color='teal'><Link to='/login'>Login</Link></Button>} 
                            closeIcon>
                            <Modal.Content> <Login /> </Modal.Content>
                        </Modal>   
                        <Button.Or />
                        <Modal size='small' dimmer='blurring' trigger={<Button positive>Signup</Button>} closeIcon />
                    </Button.Group>
                </Menu.Item>
            </Menu>
        </div>

    )

  }

}

export default NavBar;