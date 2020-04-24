
import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/currentUser.js'
import { Button, Icon, Input, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { ReactMic } from 'react-mic'


export class Recorder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        soundster: '',
        record: false
      }
    }

   
    startRecording = () => {
      this.setState({
        record: true
      });
      console.log("RECORDING!")
    }
   
    stopRecording = () => {
      this.setState({
        record: false
      });
    }
   
    onData(recordedBlob) {
      console.log('chunk of real-time data is: ', recordedBlob);
    }
   
    onStop(recordedBlob) {
      console.log('recordedBlob is: ', recordedBlob);
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
        }

        return (
            <div className='mainRecContainer'>
                <div className='cassette'>
                    <div className='gear1'>
                        <span className='helper'></span>
                    </div>
                    <div className='gear2'>
                        <span className='helper'></span>
                    </div>
                    <div className='soundsterContainer'>
                        <Form className='soundster-input'>
                            <Form.Input onChange={this.handleChange}
                                placeholder="Who's the soundster?"
                                name='soundster'
                                value={this.state.soundster}
                            />
                        </Form>
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
                <Button.Group icon>
                    <Button className='recordButton' color="olive" onClick={rotateGears}>
                        <Icon name='microphone' />
                        Record 
                    </Button>
                    <Button className='stopButton' onClick={stopGears}>
                        <Icon name='stop' />
                        Stop   
                    </Button>
                    <Button className='playButton' onClick={playGears}>
                        <Icon name='play' />
                        Play
                    </Button>
                    <Button className= 'saveButton' color="orange">
                        <Icon name='paper plane outline' />
                        Save
                    </Button>
                </Button.Group>
            </div>
        )
    }
}

export default Recorder