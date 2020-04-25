const initialState = {
    category: '',
    tags: [],
    soundfile: '',
    soundster: '',
    image: '',
    mood: '',
    date: '',
    privateCard: false
}

export default (state = initialState, action) => {
    switch (action.type){
        case "ADD_AUDIO_DATA":
            return action.formData
        default:
            return state
    }
}