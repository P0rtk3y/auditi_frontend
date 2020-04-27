import React from 'react'
import MyAudiocards from './MyAudiocards.js'
import { Card } from 'semantic-ui-react'


const Home = () => {
    return (
        <div className="home-container">
            <Card.Group itemsPerRow={4}>
                    <MyAudiocards />
            </Card.Group>
        </div>
    )
}

export default Home; 