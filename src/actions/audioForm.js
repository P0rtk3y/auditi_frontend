export const updateAudioForm = (name, value) => {
    const formData = {name, value}
    console.log(formData)
    return {
        type: "UPDATE_AUDIO_FORM",
        formData
    }
}