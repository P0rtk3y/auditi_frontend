import React from 'react'
import { connect } from 'react-redux'
import { filterAudiocards } from '../actions/myAudioCards'
import Audiocard from './Audiocard'

class Searchbar extends React.Component {
    constructor(props) {
      super()
      this.state = {
        audiocards: props.audiocards,
        filteredCards: []
        }
    }

    
        


    render(){
        const findInput = document.querySelector('div.ui.icon.input.firstElementChild.value')

        console.log(findInput)
        return(
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        audiocards: state.myAudioCards
    }
}


export default connect(mapStateToProps, {filterAudiocards})(Searchbar)
