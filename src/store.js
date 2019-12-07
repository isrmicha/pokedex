import { createStore, applyMiddleware, compose } from 'redux'
import { Reducers } from './reducers'
import thunk from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(Reducers, composeEnhancer(applyMiddleware(thunk)))
