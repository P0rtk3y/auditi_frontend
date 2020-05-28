import React from 'react'
import {Icon, Label} from 'semantic-ui-react'

const Playcontroller = ({playing, playOrPause, sound, playCount}) => {
   
    const handleFastforward = e => {
        if(sound){
            sound.stop()
        }
    }

    return(
        <div>
            <Label className="count" circular size='large'>
                {playCount}
            </Label> 
            <Icon 
                // onClick={e=>handleRewind()}
                name='fast backward'
                size='small'
            />   
            <Icon 
                onClick={playOrPause} 
                name={playing ? 'pause circle outline':'play circle outline'} 
                style={{color: "#D8ECE8"}}
                count={playCount}
            />
            <Icon 
                onClick={handleFastforward}
                name='fast forward'
                size='small'
            />  
        </div>
    )
    
}

export default Playcontroller; 

