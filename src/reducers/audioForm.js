const initialState = {
    category: '',
    tags: [],
    soundfile: '',
    soundster: '',
    image: 'https://loremflickr.com/g/200/200/',
    mood: '',
    privateCard: false
}

export default (state = initialState, action) => {
    switch (action.type){
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