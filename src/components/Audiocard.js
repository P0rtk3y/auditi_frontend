import React from 'react'
import { Image, Card, Grid} from 'semantic-ui-react';
import myAudioCards from '../reducers/myAudioCards';
import Tags from './Tags'
import Pizzicato from 'pizzicato'

const Audiocard = ({audiocard}) => {


    let newDate = ''
    if (audiocard.attributes.created_at){
        let convertDate = audiocard.attributes.created_at.split('T')[0].split('-')
        newDate = new Date(convertDate).toDateString()
    }

    //play on hover
    const playRecording = () => {
        if(audiocard.attributes.soundfile){
            const getSound = new Pizzicato.Sound({
                source: 'file',
                options: {path: audiocard.attributes.soundfile}
            }, () => {
                getSound.play()
            })
        }
    }

    const tags = JSON.parse(audiocard.attributes.tags)

    const getTags = tags.map((tag, index) => 
        <Tags tag={tag} key={index} />
    )

    

        return (
                <Card color="olive">
                    <Image src={audiocard.attributes.image} /> 
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
                </Card>
        )
}

export default Audiocard;