
import React from 'react'
import { connect } from 'react-redux'
import { Icon, Form, Button, Grid } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import { ReactMic } from 'react-mic'
import Pizzicato from 'pizzicato'
import OnEvent from 'react-onevent'
import { updateAudioForm, createRecording} from '../actions/audioForm.js'
import { addAudiocard } from '../actions/myAudioCards.js'


class Recorder extends React.Component {
    constructor(props) {
      super();
      this.state = {
        record: false,
        soundfile: '',
        tags: [],
        category: '',
        soundster: '',
        blob: '',
        favorite: false,
        displayErrors: false
        }
      }
    
    //Recording Methods
    startRecording = () => {
      this.setState({
        record: true
      });

    }

    playRecording = () => {
        if (this.state.soundfile) {
            this.state.soundfile.play()
            // let newAudio = new Audio(this.state.soundfile)
            // let newAudio = new Audio(this.state.blob)
            // newAudio.play()
        } else {
            console.log("no sound")
        }
    }

    
    onStop = (micFeedback) => {
        const getSound = new Pizzicato.Sound({
            source: 'file',
            options: {path: micFeedback.blobURL}
        }, () => {
            this.setState({soundfile: getSound})
            this.setState({blob: micFeedback.blobURL})
            // this.props.addRecording({soundfile: getSound, blob: micFeedback.blobURL}
        })
    }

    // onStop = (micFeedback) => {
    //     let url = URL.createObjectURL(micFeedback.blob)
    //     URL.revokeObjectURL(url)
    //     let reader = new FileReader()
    //         reader.readAsDataURL(micFeedback.blob)
    //     let base64FileData = reader.result.toString()
    //     let mediaFile = {
    //         fileUrl: url,
    //         size: micFeedback.blob.size,
    //         type: micFeedback.blob.type,
    //         src: base64FileData
    //     };
    //     this.setState({soundfile: mediaFile})       
    // }

    // Tag input methods

    addTag = e => {
        let newNoSpaceTag = `${e.target.value.trim()}`
        if(!this.state.tags.includes(newNoSpaceTag) && this.state.tags.length < 5){
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

    //event handlers

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
            soundfile: this.state.blob,
            soundster: this.state.soundster,
            image: `https://loremflickr.com/g/200/200/${this.state.tags[0]}`,
            favorite: false,
            user_id: this.props.userId
            // storedBlob: this.state.blob
        }
        // this.props.updateAudioForm(recorderFormData)

        // blob conversion
        // let newAudio = new Audio(this.state.blob)

        
        
        if(Object.values(recorderFormData).every(k => k !== "" || k.length !== 0)){
            this.props.createRecording(recorderFormData)
            this.setState({displayErrors: false})
            alert("Successfully Saved!")
        } else {
            return this.setState({displayErrors: true})
        }

        

    }


    
    render(){
        //animate gears 

        const rotateGears = e => {
            document.querySelector('.gear1').style.animation = "rotation 8s infinite linear"
            document.querySelector('.gear2').style.animation = "rotation 8s infinite linear"
            this.startRecording()
            console.log("RECORDING")
        }

        const stopGears = e => {
            document.querySelector('.gear1').style.animation = ""
            document.querySelector('.gear2').style.animation = ""
            this.setState({record: false})
            console.log("STOPPING")
        }

        const playGears = e => {
            document.querySelector('.gear1').style.animation = "rotation 8s infinite linear"
            document.querySelector('.gear2').style.animation = "rotation 8s infinite linear"
            this.playRecording()
            console.log("PLAYING")
        }


        //options for category input
        const categoryOptions = [
            { key:1, value: 'quotes', text: 'quotes', icon: 'comment alternate'},
            { key:2, text: 'Music', value: 'music', icon: 'music'},
            { key:3, text: 'Nature', value: 'nature', icon: 'leaf'},
            { key:4, text: 'Joke', value: 'joke', icon: 'smile'},
            { key:5, text: 'Health', value: 'health', icon: 'hand spock'},
            { key:6, text: 'Personal', value: 'personal', icon: 'user secret'},
            { key:7, text: 'Mechanical', value: 'mechanical', icon: 'wrench'},
            { key:8, text: 'Other', value: 'other', icon: 'find'},
        ]

        const getclassName = this.state.displayErrors ? 'displayErrors' : ''

        return (
            <div className='mainRecContainer'>
                <Form className={getclassName} onSubmit={this.handleSubmit} noValidate> 
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
                                            <Grid.Column width={6}>
                                                <OnEvent space={this.addTag}>
                                                    <Form.Input
                                                        style={{width: "200px"}}
                                                        placeholder="Add tags"
                                                        name='addTags'
                                                        icon
                                                    >
                                                        <input />
                                                        <Icon name='tag' />
                                                    </Form.Input>
                                                </OnEvent>
                                            </Grid.Column>
                                            <Grid.Column width={10}>
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
                    <Form.Group className="recorderButtons" style={{margin: "10px 0px 10px 465px"}}>
                        <Form.Button type="button" attached='bottom' className='recordButton' color="olive" onClick={rotateGears}>
                            <Icon name='microphone' />
                            Record 
                        </Form.Button>
                        <Form.Button type="onStop" attached='bottom' className='stopButton' onClick={stopGears}>
                            <Icon name='stop' />
                            Stop   
                        </Form.Button>
                        <Form.Button type="button" attached='bottom'className='playButton' onClick={playGears}>
                            <Icon name='play' />
                            Play
                            <audio className='play audio' src=""></audio>
                        </Form.Button>
                        <Form.Button type='Submit' className= 'saveButton' color="orange">
                            <Icon name='paper plane outline' />
                            <br></br>
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

export default connect(mapStateToProps, {updateAudioForm, createRecording, addAudiocard})(Recorder)