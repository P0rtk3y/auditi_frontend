const initialState = {
    category: '',
    tags: [],
    soundfile: '',
    soundster: '',
    image: 'https://loremflickr.com/g/200/200/',
    mood: '',
    privateCard: false,
    storedRecording: '',
    storedBlob: ''
}

export default (state = initialState, action) => {
    switch (action.type){
        case "UPDATE_AUDIO_FORM":
            return action.formData
        default:
            return state
    }
}