
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Form, Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { ReactMic } from 'react-mic'
import Pizzicato from 'pizzicato'
import OnEvent from 'react-onevent'
import { addRecording, updateAudioForm} from '../actions/audioForm.js'


class Recorder extends React.Component {
    constructor(props) {
      super();
      this.state = {
        record: false,
        soundfile: '',
        tags: [],
        category: '',
        soundster: ''
        }
      }
    
    //Recording Methods
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
        if (this.state.soundfile) {
            this.state.soundfile.play()
        } else {
            console.log("no sound")
        }

    }

    onStop = (micFeedback) => {
        const getSound = new Pizzicato.Sound({
            source: 'file',
            options: {path: [micFeedback.blobURL]}
        }, () => {
            this.setState({soundfile: getSound})
            // this.props.addRecording({soundfile: getSound, blob: micFeedback.blobURL})
            // getSound.play()
        })
    //   console.log('recordedBlob is: ', recording);
    }

    // Tag input methods

    addTag = e => {
        let newNoSpaceTag = `${e.target.value.trim()}`
        if(!this.state.tags.includes(newNoSpaceTag)){
            this.setState({
                tags: [...this.state.tags, newNoSpaceTag]
            })
            e.target.value = ''
        } 
    }

    deleteTag = removeTag => {
        const filteredTags = this.state.tags.filter(tag => {
            return tag !== removeTag
        })        
        this.setState({
            tags: filteredTags
        })  
    }

    handleChange = (e, {name,value}) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const recorderFormData = {
            category: this.state.category,
            tags: this.state.tags,
            soundfile: this.state.soundfile,
            soundster: this.state.soundster,
            image: `https://loremflickr.com/g/200/200/${this.state.tags[0]}`
        }
        this.props.updateAudioForm(recorderFormData)
    }


   
    
    render(){
        //animate gears 
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


        //options for category input
        const categoryOptions = [
            { key:1, value: 'quotes', text: 'Quotes', icon: 'book'},
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
                                    placeholder="Sound source"
                                    name='soundster'
                                />
                            </div>
                            <div className='category-input'>
                                <Form.Select onChange={this.handleChange} 
                                    placeholder="Category"
                                    options={categoryOptions}
                                    name='category' 
                                />
                            </div>
                            <div className='tag-input' style={{width: "550px"}}>
                                    <Grid>
                                        <Grid.Row columns={2}>
                                            <Grid.Column>
                                                <OnEvent space={this.addTag}>
                                                    <Form.Input
                                                        style={{width: "200px"}}
                                                        placeholder="Add tags"
                                                        name='add tags'
                                                        icon
                                                    >
                                                        <input />
                                                        <Icon name='tag' />
                                                    </Form.Input>
                                                </OnEvent>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Grid>
                                                    <Grid.Row columns={2}>
                                                            {this.state.tags.map((tag, index) => {
                                                                return  <Button onClick={e => this.deleteTag(tag)}
                                                                            color='teal'
                                                                            icon name='delete'
                                                                            key={index}
                                                                            labelPosition='right'
                                                                            style={{margin:"10px 5px 0px 10x"}}
                                                                            >{tag}
                                                                                <Icon name='delete' />
                                                                        </Button>
                                                            })}
                                                    </Grid.Row>
                                                </Grid>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
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
                            mimeType="audio/mp3" 
                            duration={30}
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

// const mapStateToProps = state => {
//     return {
//         storedRecording: state.storedRecording,
//         blob: state.storedBlob
//     }
// }

export default connect(mapStateToProps, {addRecording, updateAudioForm})(Recorder)