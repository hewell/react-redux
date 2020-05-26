const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers

const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

{
    type: BUY_CAKE
}

{
    type: BUY_ICECREAM
}

function buyCake () {
    return {
        type: BUY_CAKE
    }
}

function buyIcecream () {
    return {
        type: BUY_ICECREAM
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIcecreamState = {
    numOfIcecream: 10
}

// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        
        default: return state
    }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIcecream : state.numOfIcecream - 1
        }
        
        default: return state
    }
}

const rootReducer = combineReducers({
    cake : cakeReducer,
    icecream : icecreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

unsubscribe()