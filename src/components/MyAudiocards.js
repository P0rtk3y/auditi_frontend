import React from 'react'
import { connect } from 'react-redux'
import Audiocard from './Audiocard'

const MyAudiocards = ({userAudiocards}) => {

    const audiocards = userAudiocards.sort((a, b) => b.attributes.created_at.split(".")[0].split("T").join("").split("-").join("").split(":").join("") - a.attributes.created_at.split(".")[0].split("T").join("").split("-").join("").split(":").join("")).map(audio => 
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
