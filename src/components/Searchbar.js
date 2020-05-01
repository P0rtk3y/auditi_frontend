import React from 'react'
import { connect } from 'react-redux'
import Audiocard from './Audiocard'
import { Card } from 'semantic-ui-react'

const Searchbar = props => {
       
    const audiocards = props.audiocards.map(audio => 
        <Audiocard audiocard={audio} key={audio.id} />
    )
    
    return(
        <div className="home-container">
            <Card.Group itemsPerRow={4}>
                {audiocards}
            </Card.Group>
        </div>   
    )
    
}

const mapStateToProps = state => {
    return {
        audiocards: state.myAudioCards.filter(
            audio =>
                audio.attributes.tags.includes(state.searchbar) ||
                (audio.attributes.category === state.searchbar) ||
                (audio.attributes.soundster.split(' ').includes(state.searchbar))
        )
    }
}


export default connect(mapStateToProps)(Searchbar)
