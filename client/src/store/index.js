import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import thank from 'redux-thunk'

const middleware = [thank]

const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store