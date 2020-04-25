export const updateAudioForm = (name, value) => {
    const formData = {name, value}
    return {
        type: "UPDATE_AUDIO_FORM",
        formData
    }
}