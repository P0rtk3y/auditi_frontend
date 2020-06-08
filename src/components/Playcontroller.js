
import React, {useState} from 'react'
import {Icon, Label} from 'semantic-ui-react'

const Playcontroller = ({playing, playOrPause, sound, playCount, id, handleLoop, loop}) => {


    // const handleLoop = e => {
    //     let getLoop = document.querySelector(`i.retweet.tiny.icon.id-${id}`)
    //     // getLoop.style.color !== 'orange' ? getLoop.style.color = 'orange' : getLoop.style.color = '#D8ECE8'
    //     console.log("LOOPING")
    //     if(loop){
    //        getLoop.style.color = 'orange'
    //     } else {
    //         getLoop.style.color = '#D8ECE8'
    //     }
    // }
   
    const handleRewind = e => {
        if(sound){
            sound.stop()
            sound.play()
        }
    }
    
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
                onClick={handleLoop}
                className={`id-${id}`}
                name='retweet'
                size='tiny'
                style={loop ? {color: 'orange'} : {color: '#D8ECE8'}}
            />  
            <Icon 
                onClick={handleRewind}
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

