const initialState = []

export default (state = initialState, action) => {
    switch (action.type){
        case "SET_MY_AUDIOCARDS":
            return action.audiocards
        default:
            return state
    }
}