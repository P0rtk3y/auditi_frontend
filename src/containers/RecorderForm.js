import React, { Component } from 'react'
import Recorder from '../components/Recorder'

class RecorderForm extends Component {
    constructor(props){
        super()
        this.state = {
            category: '',
            tags: [],
            soundfile: '',
            soundster: '',
            image: '',
            mood: '',
            date: '',
            privateCard: false
        }
    }

    render(){
        return (
            <Recorder soundfile={this.state.soundfile} addSoundFile={(sound) => this.setState({sound})}/>
        )
    }
}

export default RecorderForm