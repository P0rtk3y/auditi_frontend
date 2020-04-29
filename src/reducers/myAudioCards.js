const initialState = []

export default (state = initialState, action) => {
    switch (action.type){
        case "SET_MY_AUDIOCARDS":
            return action.audiocards
        case "CLEAR_AUDIOCARDS":
            return initialState
        default:
            return state
    }
}