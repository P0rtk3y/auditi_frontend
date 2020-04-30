import {addAudiocard, getMyAudiocards} from './myAudioCards'


export const updateAudioForm = formData => {
    return {
        type: "UPDATE_AUDIO_FORM",
        formData
    }
}


export const createRecording = formData => {
    console.log(formData)
    return dispatch => {
        const audiocardData = { 
            audiocard: {
                category: formData.category,
                tags: formData.tags,
                soundfile: formData.soundfile,
                soundster: formData.soundster,
                image: formData.image,
                user_id: formData.user_id
            }  
        }
        return fetch("http://localhost:3000/api/v1/audiocards", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(audiocardData)
        })
        
        .then(resp => resp.json())
        .then(response => {
            if(response.error){
                alert(response.error)
            } else {
                return dispatch(getMyAudiocards())
            }
        })
        .catch(console.log)
    }
}