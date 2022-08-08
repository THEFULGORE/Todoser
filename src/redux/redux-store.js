import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import todoReducer from "./todo-reducer";
import { getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'

let reducers = combineReducers({
    todoForm: todoReducer,
})

//Setup for redux devtools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware.withExtraArgument({getFirebase, getFirestore}))));

export default store;