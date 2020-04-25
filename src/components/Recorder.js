
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Form, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { ReactMic } from 'react-mic'
import Pizzicato from 'pizzicato'
import { updateAudioForm } from '../actions/audioForm.js'


class Recorder extends React.Component {
    constructor(props) {
      super();
      this.state = {
        record: false,
        soundfile: ''
        }
      }
    
   
    startRecording = () => {
      this.setState({
        record: true
      });

    }
   
    stopRecording = () => {
      this.setState({
        record: false
      });
    }

    playRecording = () => {
        if (this.state.soundfile){
           this.state.soundfile.play()
        }
        
    }

   
    onStop = (recordedBlob) => {
        const getSound = new Pizzicato.Sound({
            source: 'wave',
            options: {path: [recordedBlob.blobURL]}
        }, () => {
            let file = new Audio()
            file.src = recordedBlob.blobURL
            this.setState({soundfile: file})
        })
      console.log('recordedBlob is: ', recordedBlob);
    }

    handleChange = e => {
        const {name, value} = e.target 
        updateAudioForm(name, value)
    }

    handleSubmit = e => {
        e.preventDefault()
    }

   
    
    render(){
        const rotateGears = e => {
            document.querySelector('.gear1').style.animation = "rotation 8s infinite linear"
            document.querySelector('.gear2').style.animation = "rotation 8s infinite linear"
            this.startRecording()
        }

        const stopGears = e => {
            document.querySelector('.gear1').style.animation = ""
            document.querySelector('.gear2').style.animation = ""
            this.stopRecording()
        }

        const playGears = e => {
            document.querySelector('.gear1').style.animation = "rotation 8s infinite linear"
            document.querySelector('.gear2').style.animation = "rotation 8s infinite linear"
            this.playRecording()
        }

        const categoryOptions = [
            { key:1, text: 'Quotes', value: 'quotes', icon: 'book'},
            { key:2, text: 'Music', value: 'music', icon: 'music'},
            { key:3, text: 'Nature', value: 'nature', icon: 'leaf'},
            { key:4, text: 'Joke', value: 'joke', icon: 'smile'},
            { key:5, text: 'Health', value: 'health', icon: 'hand spock'},
            { key:6, text: 'Personal', value: 'personal', icon: 'user secret'},
            { key:7, text: 'Mechanical', value: 'mechanical', icon: 'wrench'},
            { key:8, text: 'Other', value: 'other', icon: 'find'},
        ]

        return (
            <div className='mainRecContainer'>
                <Form className='soundsterForm' onSubmit={this.handleSubmit}> 
                    <div className='cassette'>
                        <div className='gear1'>
                            <span className='helper'></span>
                        </div>
                        <div className='gear2'>
                            <span className='helper'></span>
                        </div>
                        <div className='soundsterContainer'>
                            <div className='soundster-input'>
                                <Form.Input onChange={this.handleChange}
                                    className="soundster-input-box"
                                    placeholder="Who's the soundster?"
                                    name='soundster'
                                />
                            </div>
                            <div className='category-input'>
                                <Form.Select onChange={this.handleChange} 
                                    options={categoryOptions}
                                    placeholder="Category"
                                    name='category' 
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className='recordingContainer'>
                        <ReactMic
                            record={this.state.record}
                            className="sound-wave"
                            onStop={this.onStop}
                            strokeColor="#D4E6D7"
                            backgroundColor="#8FC6B4" 
                            duration={25}
                            />
                    </div>
                    <Form.Group className="recorderButtons" style={{margin: "10px 0px 10px 420px"}}>
                        <Form.Button className='recordButton' color="olive" onClick={rotateGears}>
                            <Icon name='microphone' />
                            Record 
                        </Form.Button>
                        <Form.Button className='stopButton' onClick={stopGears}>
                            <Icon name='stop' />
                            Stop   
                        </Form.Button>
                        <Form.Button className='playButton' onClick={playGears}>
                            <Icon name='play' />
                            Play
                        </Form.Button>
                        <Form.Button type='Submit' className= 'saveButton' color="orange">
                            <Icon name='paper plane outline' />
                            Save
                        </Form.Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const userId = state.currentUser ? state.currentUser.id : ""
    return {
        audioForm: state.audioForm,
        userId
    }
}

export default connect(mapStateToProps, {updateAudioForm})(Recorder)