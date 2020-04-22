import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import users from './reducers/users.js'
import currentUser from './reducers/currentUser.js'
import loginForm from './reducers/loginForm.js'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    users,
    currentUser,
    loginForm
  })
  
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

export default store