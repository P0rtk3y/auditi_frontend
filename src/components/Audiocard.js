import React from 'react'
import { Image, Card, Grid, Icon } from 'semantic-ui-react';
import myAudioCards from '../reducers/myAudioCards';
import { connect } from 'react-redux'
import Tags from './Tags'
// import Pizzicato from 'pizzicato'
import {confirmDelete, deleteAudiocard} from '../actions/myAudioCards'

const Audiocard = ({audiocard, confirmDelete, deleteAudiocard}) => {

    let newDate = ''
    if (audiocard.attributes.created_at){
        let convertDate = audiocard.attributes.created_at.split('T')[0].split('-')
        newDate = new Date(convertDate).toDateString()
    }

    //play on hover
    const playRecording = () => {
        console.log("PLAYING RECORDING")
        if(audiocard.attributes.soundfile){
        //    audiocard.attributes.soundfile.play()
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
    

        return (
                <Card color="olive">
                    <Image src={audiocard.attributes.image} size='large'/> 
                    <Card.Content
                        onMouseOver={playRecording()}
                    >
                        <Card.Header>{audiocard.attributes.soundster}</Card.Header>
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
                    <Icon name="times circle" color='yellow' className='deleteIcon' onClick={handleDeleteClick}/>
                </Card>
        )
}


export default connect(null, {confirmDelete, deleteAudiocard})(Audiocard)