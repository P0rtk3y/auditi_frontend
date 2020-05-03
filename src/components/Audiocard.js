import React from 'react'
import { Image, Card, Grid, Icon, Label, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'
import Tags from './Tags'
import OnEvent from 'react-onevent'
// import Pizzicato from 'pizzicato'
import {confirmDelete, deleteAudiocard, editAudiocard, confirmEdit} from '../actions/myAudioCards'

const Audiocard = ({audiocard, confirmDelete, deleteAudiocard, editAudiocard, confirmEdit}) => {

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

    const addFavorite = e => {
        let getIcon = document.querySelector(`a.ui.left.corner.label.icon-${audiocard.id}`).firstElementChild
        !getIcon.className.includes('pink') ? getIcon.className = 'pink thumbtack icon' : getIcon.className = 'thumbtack icon'
    }


        return (
                <Card color="olive">
                    <Image 
                        fluid
                        src={audiocard.attributes.image} 
                        onMouseEnter={() => playRecording()}
                        label={{ as: 'a', corner: 'left', icon: 'thumbtack', color: 'white', className: `icon-${audiocard.id}` }}
                        onClick={e => {addFavorite()}}
                        
                    />
                    <Card.Content>
                        <Card.Header className={`header-${audiocard.id}`} onClick={e => modifyCardContent(audiocard.id)}>{audiocard.attributes.soundster}</Card.Header>
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
                    <Label corner='right' color='yellow' onClick={handleDeleteClick}><Icon name="times circle" corner= 'right' color='white' className='deleteIcon' /></Label>
                </Card>
        )
}


export default connect(null, {confirmDelete, deleteAudiocard, editAudiocard, confirmEdit})(Audiocard)