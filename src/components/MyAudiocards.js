import React from 'react'
import { connect } from 'react-redux'
import Audiocard from './Audiocard'

const MyAudiocards = ({userAudiocards}) => {

    console.log(userAudiocards)
    const audiocards = userAudiocards.sort((a, b) => b.attributes.created_at.split("T")[0].split("-").join("") - a.attributes.created_at.split("T")[0].split("-").join("")).map(audio => 
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
