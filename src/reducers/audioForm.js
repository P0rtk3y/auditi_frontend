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
        case "ADD_RECORDING":
            return {
                ...state,
                storedRecording: action.recording.soundfile,
                storedBlob: action.recording.blob
            }
        case "UPDATE_AUDIO_FORM":
            const updateData = {
                ...state,
                [action.formData.name]: action.formData.value
            }
            return updateData
        default:
            return state
    }
}

console.log(initialState.storedRecording)