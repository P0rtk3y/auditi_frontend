import { Image, Card, Grid, Icon, Label, Button, Modal, Header } from 'semantic-ui-react';
import { connect } from 'react-redux'
import React, {useState} from 'react'
import Tags from './Tags'
// import Pizzicato from 'pizzicato'
import {confirmDelete, deleteAudiocard, editAudiocard, confirmEdit, favoriteAudiocard, confirmFavorite} from '../actions/myAudioCards'

const Audiocard = ({audiocard, confirmDelete, deleteAudiocard, editAudiocard, confirmEdit, favoriteAudiocard, confirmFavorite}) => {
    
    const [modalState, setModal] = useState(false)

    let newDate = ''
    if (audiocard.attributes.created_at){
        let convertDate = audiocard.attributes.created_at.split('T')[0].split('-')
        newDate = new Date(convertDate).toDateString()
    }

    //play on hover
    const playRecording = () => {
        console.log("PLAYING RECORDING")
        if(audiocard.attributes.soundfile){
            // let blob = new Blob(audiocard.attributes.soundfile)
            // let url = window.URL.createObjectURL(blob)
            // console.log(url)
            // window.audio = new Audio()
            // window.audio.src = url 
            // window.audio.play()
            // return audiocard.attributes.soundfile.play()
        }
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

    const addColor = (category) => {
        switch(category){
            case "quotes":
                return "#AECBDF"
            case "music":
                return "#DFC2AE"
            case "nature":
                return "#AEDFC1"
            case "Personal":
                return "#DFB3AE"
            case "joke":
                return "#C99EDB"
            case "health":
                return "#DA9333"
            default:
                return "#AEDFD5"
        }
    }

    const modifyCardContent = (id) => {
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

    const addFavorite = (audiocard) => {
        console.log(audiocard.attributes.favorite)
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
                    <Image 
                        fluid
                        src={audiocard.attributes.image} 
                        onMouseEnter={() => playRecording()}
                        label={{ 
                            as: 'a', 
                            corner: 'left', 
                            className: `icon-${audiocard.id}`,
                            icon: audiocard.attributes.favorite ? "pink bullhorn" : "bullhorn"
                        }}
                        onClick={e => addFavorite(audiocard)}
                    />
                    <Card.Content>
                        <Card.Header 
                            className={`header-${audiocard.id}`} 
                            onClick={e => modifyCardContent(audiocard.id)}>{audiocard.attributes.soundster}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>Created on {newDate}</span>
                        </Card.Meta>
                        <Card.Description style={{color:addColor(audiocard.attributes.category)}}>
                            ({audiocard.attributes.category})
                        </Card.Description>
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
                                    <Icon name="trash alternate outline" color="olive" small /> 
                                    Are you sure you want to delete?
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' inverted onClick={e => handleDeleteClick()}>
                                    <Icon name='checkmark' /> Yes
                                </Button>
                                <Button color='red' inverted onClick={e => setModal(false)}>
                                    <Icon name='checkmark'/> No
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Label>
                </Card>
        )
}


export default connect(null, {confirmDelete, deleteAudiocard, editAudiocard, confirmEdit, favoriteAudiocard, confirmFavorite})(Audiocard)