
import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Input, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { ReactMic } from 'react-mic'
import { addAudioData } from '../actions/audioForm.js'


class Recorder extends React.Component {
    constructor(props) {
      super();
      this.state = {
        record: false,
        soundfile: {
            recording: '',
            blob: ''
        }
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
        if (this.state.soundfile.recording){
            this.state.recording.play()
        }
    }
   
    onData(recordedBlob) {
      console.log('chunk of real-time data is: ', recordedBlob);
    }
   
    onStop(recordedBlob) {
      console.log('recordedBlob is: ', recordedBlob);
    }

    handleChange = e => {
        const {name, value} = e.target 
        this.setState({
            [name]: value
        })
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

        return (
            <div className='mainRecContainer'>
                <Form className='soundsterForm'> 
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
                                    value={this.props.soundster}
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
                    <Form.Group icon className="recorderButtons" style={{margin: "10px 0px 10px 420px"}}>
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
                        <Form.Button className= 'saveButton' color="orange">
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
    return {
        audioForm: state.audioForm
    }
}

export default connect(mapStateToProps)(Recorder)