const initialState = []

export default (state = initialState, action) => {
    switch (action.type){
        case "SET_MY_AUDIOCARDS":
            return action.audiocards
        case "DELETE_AUDIOCARD":
            return state.filter(audiocard => audiocard.id !== action.audiocardId)
        default:
            return state
    }
}