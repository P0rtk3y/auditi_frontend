import {resetSignupForm} from './signupForm'
import {resetLoginForm} from './loginForm'
import {getMyAudiocards} from './myAudioCards'
import {clearAudiocards} from './myAudioCards'

//synchronous action creators
export const setCurrentUser = user => {
    return {
        type: "SET_CURRENT_USER",
        user
    }
}

export const clearCurrentUser = () => {
    return {
        type: "CLEAR_CURRENT_USER"
    }
}


//asynchronous action creators
export const login = credentials => {
    return dispatch => {
        return fetch("http://localhost:3000/api/v1/login", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(resp => resp.json())
            .then(user => {
                if (user.error){
                    alert(user.error)
                } else {
                    dispatch(setCurrentUser(user.data))
                    dispatch(getMyAudiocards())
                    dispatch(resetLoginForm())
                }
            })
            .catch(console.log)
    }
}

export const signup = credentials => {
    return dispatch => {
        const userInfo = {
            user: credentials
        }
        return fetch("http://localhost:3000/api/v1/signup", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(resp => resp.json())
        .then(user => {
            if(user.error){
                alert(user.error)
            } else {
                dispatch(setCurrentUser(user.data))
                dispatch(resetSignupForm())
            }
        })
        .catch(console.log)
    }
}

export const getCurrentUser = () => {
    return dispatch => {
        return fetch("http://localhost:3000/api/v1/get_current_user", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(resp => resp.json())
            .then(response => {
                if (response.error){
                    alert(response.error)
                } else {
                    dispatch(setCurrentUser(response.data))
                    dispatch(getMyAudiocards())
                }
            })
            .catch(console.log)
    }
}

export const logout = e => {
    return dispatch => {
        dispatch(clearCurrentUser())
        dispatch((clearAudiocards()))
        return fetch('http://localhost:3000/api/v1/logout', {
            credentials: "include", 
            method: "DELETE"
        })
    }
}