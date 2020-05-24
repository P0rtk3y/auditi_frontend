import React from 'react'
import {Icon, Label} from 'semantic-ui-react'

const Playcontroller = ({playing, playOrPause, playCount}) => {


    return(
        <div>
    
            <Label className="count" circular size='large'>
                {playCount}
            </Label>    
            <Icon 
                onClick={playOrPause} 
                name={playing ? 'pause circle outline':'play circle outline'} 
                style={{color: "#D8ECE8"}}
                count={playCount}
            />
        </div>
    )
    
}

export default Playcontroller; 

