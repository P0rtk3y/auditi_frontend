export const setMyAudiocards = audiocards => {
    return {
        type: "SET_MY_AUDIOCARDS",
        audiocards
    }
}

export const getMyAudiocards = () => {
    return dispatch => {
        return fetch("http://localhost:3000/api/v1/audiocards", {
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
                    dispatch(setMyAudiocards(response.data))
                }
            })
            .catch(console.log)
    }
}