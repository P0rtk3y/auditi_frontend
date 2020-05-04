import React from 'react'
import MyAudiocards from '../containers/MyAudiocards.js'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import Homepage from './Homepage'


const Home = ({currentUser, loggedIn}) => {
    return (
        <div className="home-container">
            {loggedIn ?
                <Card.Group itemsPerRow={4}>
                    <MyAudiocards />
                </Card.Group> :
                    <Homepage />
            }
        </div>
    )
}

const mapStateToProps = ({currentUser}) => {
    return {
      currentUser,
      loggedIn: !!currentUser
    }
  }
  
  
export default connect(mapStateToProps)(Home);