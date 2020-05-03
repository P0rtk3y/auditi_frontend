const initialState = []

export default (state = initialState, action) => {
    switch (action.type){
        case "SET_MY_AUDIOCARDS":
            return action.audiocards
        case "ADD_AUDIOCARD":
            return state.concat(action.audiocard)
        case "EDIT_AUDIOCARD":
            return state.map(audiocard => audiocard.id === action.audiocard.id ? action.audiocard : audiocard)
        case "DELETE_AUDIOCARD":
            return state.filter(audiocard => audiocard.id !== action.audiocardId)
        default:
            return state
    }
}