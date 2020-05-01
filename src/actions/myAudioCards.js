
const baseURL = "http://localhost:3000/api/v1"



export const setMyAudiocards = audiocards => {
    return {
        type: "SET_MY_AUDIOCARDS",
        audiocards
    }
}

export const addAudiocard = audiocard => {
    return {
        type: "ADD_AUDIOCARD",
        audiocard
    }
}

export const clearAudiocards = audiocards => {
    return {
        type: "CLEAR_AUDIOCARDS"
    }
}


export const confirmDelete = audiocardId => {
    return {
        type: "DELETE_AUDIOCARD",
        audiocardId
    }
}



export const getMyAudiocards = () => {
    return dispatch => {
        return fetch(`${baseURL}/audiocards`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(resp => resp.json())
            .then(response => {
                if (response.error){
                    alert(response.error)
                } else {
                    return dispatch(setMyAudiocards(response.data))
                }
            })
            .catch(console.log)
    }
}

export const deleteAudiocard = (audiocardId) => {
    return dispatch => {
        return fetch(`${baseURL}/audiocards/${audiocardId}`, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
    })
        .then(resp => resp.json())
        .then(response => {
            if (response.error){
                alert(response.error)
            } else {
                return dispatch(getMyAudiocards())
            }
        })
        .catch(console.log)
    }
}