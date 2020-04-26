import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import users from './reducers/users.js'
import currentUser from './reducers/currentUser.js'
import loginForm from './reducers/loginForm.js'
import signupForm from './reducers/signupForm.js'
import audioForm from './reducers/audioForm.js'
import myAudioCards from './reducers/myAudioCards.js'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    users,
    currentUser,
    loginForm,
    signupForm,
    audioForm,
    myAudioCards
  })
  
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

export default store