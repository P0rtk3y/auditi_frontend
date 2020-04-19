import React, { Component } from 'react'
import Recorder from '../components/Recorder'

class RecorderForm extends Component {
    constructor(props){
        super()
        this.state = {
            category: '',
            tags: [],
            soundfile: '',
            speaker: '',
            source: '',
            image: '',
            mood: '',
            date: ''
        }
    }

    render(){
        return (
            <Recorder soundfile={this.state.soundfile} addSoundFile={(sound) => this.setState({sound})}/>
        )
    }
}

export default RecorderForm