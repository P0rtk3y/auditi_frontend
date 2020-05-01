
export default (state = '', action) => {
    switch (action.type){
        case "CHANGE_SEARCH_TEXT":
            return action.value
        default:
            return state
    }
}
