import React from 'react'
import { Image, Card, Icon, Button} from 'semantic-ui-react';
import myAudioCards from '../reducers/myAudioCards';

const Audiocard = ({audiocard}) => {

    //fix date
    let newDate = ''
    if (audiocard.attributes.created_at){
        let convertDate = audiocard.attributes.created_at.split('T')[0].split('-')
        newDate = new Date(convertDate).toDateString()
    }

    //play on hover
    const playRecording = () => {
        if(audiocard.attributes.soundfile){
        return audiocard.attributes.soundfile.play()
        }
    }

    const tags = audiocard.attributes.tags


    return (
            <Card color="olive">
                <Image src={audiocard.attributes.image} /> 
                <Card.Content
                    // onMouseOver={playRecording}
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
                    <Icon name="hashtag" position="left">{tags}</Icon>
                </Card.Content>
            </div>
            </Card>
    )
}

export default Audiocard;