import React, { PureComponent } from 'react';
import { Menu, Icon, Search, Item, Image, Label} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
                <Menu.Item><Search /></Menu.Item>
                <Menu.Item><Icon size={resizedIcon} name='microphone' color='olive' /></Menu.Item>
            </Menu>
        </div>
        
       
    )

  }

}

export default NavBar;