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
                        <Card.Description>
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