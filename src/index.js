import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store.js'
import { BrowserRouter as Router} from 'react-router-dom'
// import logger from 'redux-logger'

// import rootReducer from './rootReducer'


// let store = createStore(composeEnhancers(applyMiddleware(...middleware)))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
