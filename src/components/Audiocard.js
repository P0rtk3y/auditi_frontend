import { Image, Card, Grid, Icon, Label, Button, Modal, Header } from 'semantic-ui-react';
import { connect } from 'react-redux'
import React, {useState} from 'react'
import Tags from './Tags'
import Pizzicato from 'pizzicato'
import Playcontroller from './Playcontroller.js'
import {confirmDelete, deleteAudiocard, editAudiocard, confirmEdit, favoriteAudiocard, confirmFavorite} from '../actions/myAudioCards'

const Audiocard = ({audiocard, confirmDelete, deleteAudiocard, editAudiocard, confirmEdit, favoriteAudiocard, confirmFavorite}) => {
    
    const [state, setState] = useState({
        modalState: false,
        sound: null,
        playing: false,
        paused: false,
        playCount: 0,
        loop: false
    })
    const [modalState, setModal] = useState(false)

    let newDate = ''
    if (audiocard.attributes.created_at){
        let convertDate = audiocard.attributes.created_at.split('T')[0].split('-')
        newDate = new Date(convertDate).toDateString()
    }

    //play on click
    const playSound = () => {
        console.log("PLAYING RECORDING")
        console.log(audiocard.attributes)
        //load sound if not played before
        if(audiocard.attributes.sound_url && !state.sound){
            const getSound = new Pizzicato.Sound({
                source: 'file',
                options: {path: audiocard.attributes.sound_url}
            }, () => {
                getSound.play()
                setState(prevState => ({...prevState, sound: getSound, playing: true}))
            })
            getSound.on('end', () => {
                console.log("ENDING")
                setState(prevState => ({...prevState, playing: false, paused: false, playCount: prevState.playCount + 1}))
            })
            return
        }
        //if resuming play (don't incrementing playCount)
        // console.log(state.sound.sourceNode.context.currentTime)
        // console.log(state.sound.sourceNode.buffer.duration)
        if(!state.playing && state.sound && state.paused){
            state.sound.play()
            setState({...state, playing: true})
        }
        //if playing again, increment playCount
        if(!state.playing && state.sound && !state.paused){
            state.sound.play()
            setState(prevState => ({...prevState, playing: true}))
        }
    }

    // Notes: play pause play 
                // play stop play

    const pauseSound = () => {
        console.log("PAUSING")
        if(state.playing){
            setState({...state, playing: false, paused: true})
            state.sound.pause()
        }
    }

    const handleLoop = () => {
        console.log("LOOPING")
        state.sound.stop()
        state.sound.loop ? state.sound.loop = false : state.sound.loop = true
        setState(prevState => ({...prevState, loop: state.sound.loop}))
        
        // if(state.sound.playing){
        //     state.sound.play()
        //     setState(prevState => ({...prevState, playCount: prevState.playCount + 1}))
        // }
    }

    const tags = JSON.parse(audiocard.attributes.tags)

    const getTags = tags.map((tag, index) => 
        <Tags tag={tag} key={index} />
    )

    const handleDeleteClick = e => {
        confirmDelete(audiocard.id)
        deleteAudiocard(audiocard.id)
        setModal(false)
    }

    const addColor = category => {
        switch(category){
            case "quotes":
                return "#AECBDF"
            case "music":
                return "#B75FD6"
            case "nature":
                return "#AEDFC1"
            case "personal":
                return "#DFB3AE"
            case "joke":
                return "#C99EDB"
            case "health":
                return "#DA9333"
            default:
                return "#AEDFD5"
        }
    }

    const addIcon = category => {
        switch(category){
            case "quotes":
                return "comment alternate"
            case "music":
                return "music"
            case "nature":
                return "leaf"
            case "personal":
                return "user secret"
            case "joke":
                return "smile"
            case "health":
                return "hand spock"
            default:
                return "find"
        }
    }


    const modifyCardContent = id => {
        let oldHeader = audiocard.attributes.soundster
        let modifyCard = document.querySelector(`div.header.header-${id}`)
            modifyCard.setAttribute('contenteditable', 'true')
        let newHeader = modifyCard.innerHTML

        if(oldHeader !== newHeader){
            audiocard.attributes.soundster = newHeader
            confirmEdit(audiocard)
            editAudiocard(audiocard)
        }
    }

    const addFavorite = audiocard => {
        let getIcon = document.querySelector(`a.ui.left.corner.label.icon-${audiocard.id}`).firstElementChild
        !getIcon.className.includes('pink') ? getIcon.className = 'pink bullhorn icon' : getIcon.className = 'bullhorn icon'
        if(getIcon.className.includes('pink')){
            audiocard.attributes.favorite = true
            favoriteAudiocard(audiocard)
            confirmFavorite(audiocard)
        }else{
            audiocard.attributes.favorite = false
            favoriteAudiocard(audiocard)
            confirmFavorite(audiocard)
        }
    }
   
        return (
                <Card color="olive">
                    <Icon.Group size='huge'>
                        <Image 
                            fluid
                            src={audiocard.attributes.image} 
                            label={{ 
                                as: 'a', 
                                corner: 'left',
                                className: `icon-${audiocard.id}`,
                                icon: audiocard.attributes.favorite ? "pink bullhorn" : "bullhorn",
                                onClick: e => addFavorite(audiocard)
                            }}
                        />
                        <Icon 
                            corner='bottom right' 
                            inverted
                            style={{color:addColor(audiocard.attributes.category)}} 
                            name={addIcon(audiocard.attributes.category)} 
                            size='large'
                            id='category-icon'
                        />
                        <Icon>
                            <Playcontroller 
                                playOrPause={state.playing ? pauseSound : playSound} 
                                sound={state.sound} 
                                playing={state.playing} 
                                playCount={state.playCount} 
                                id={audiocard.id}
                                loop={state.loop}
                                handleLoop={state.sound ? handleLoop : null}
                            />
                        </Icon>
                    </Icon.Group>
                    <Card.Content>
                        <Card.Header 
                            className={`header-${audiocard.id}`} 
                            onClick={e => modifyCardContent(audiocard.id)}>{audiocard.attributes.soundster}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>Created on {newDate}</span>
                        </Card.Meta>
                    </Card.Content>
                    <div className='icon-container'>
                        <Card.Content extra>
                            <Grid>
                                <Grid.Row column={2} className='tag-button-container'>
                                    {getTags}
                                </Grid.Row>
                            </Grid>
                        </Card.Content>
                    </div>
                    <Label corner='right' 
                        color='yellow' 
                    >
                        <Modal 
                            dimmer
                            trigger={<Icon name="times circle" className='deleteIcon' onClick={e => setModal(true)}/>} 
                            open={modalState}
                        >
                            <Header />
                            <Modal.Content>
                                <p>
                                    <Icon name="trash alternate outline" color="olive" /> 
                                    Are you sure you want to delete?
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button id='delete-button' color='green' inverted onClick={e => handleDeleteClick()}>
                                    <Icon name='checkmark' /> Yes
                                </Button>
                                <Button id='delete-button' color='red' inverted onClick={e => setModal(false)}>
                                    <Icon name='checkmark'/> No
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Label>
                </Card>
        )
}


export default connect(null, {confirmDelete, deleteAudiocard, editAudiocard, confirmEdit, favoriteAudiocard, confirmFavorite})(Audiocard)
