import React from 'react'
import { connect } from 'react-redux'
import Audiocard from './Audiocard'

const MyAudiocards = props => {

    const audiocards = props.userAudiocards.map(audio => 
            <Audiocard audiocard={audio} key={audio.id} />
    )
    
    return (
        audiocards
    )
}

const mapStateToProps = state => {
    return {
        userAudiocards: state.myAudioCards
    }
}

export default connect(mapStateToProps)(MyAudiocards)
