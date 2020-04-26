export const updateAudioForm = formData => {
    return {
        type: "UPDATE_AUDIO_FORM",
        formData
    }
}

export const addRecording = recording => {
    return {
        type: "ADD_RECORDING",
        recording
    }
}

export const createRecording = formData => {
    return dispatch => {
        const audiocardInfo = {
            audiocard: formData
        }
        return fetch("http://localhost:3000/api/v1/audiocards", {
            method: "POST",
            body: JSON.stringify(audiocardInfo)
        })
        .then(resp => resp.json())
        .then(audiocard=> {
            if(audiocard.error){
                alert(audiocard.error)
            }
        })
        .catch(console.log)
    }
}