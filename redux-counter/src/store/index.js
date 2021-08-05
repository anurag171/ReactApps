import { createStore,combineReducers } from "redux";
import {createSlice,configureStore} from '@reduxjs/toolkit';

const initialState = {counter:0,showCounter:true};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state,action){
            console.log("On increment start " + action.payload +  " state.counter " + state.counter);
            state.counter =  state.counter + Number(action.payload);
            console.log("On increment decrement " + action.payload +  " state.counter " + state.counter);
        },
        decrement(state,action){
            state.counter = state.counter - Number(action.payload);
        },
        multiply(state,action){
            state.counter=state.counter*Number(action.payload);
        },
        toggle(state){
            console.log("On toggle start " + state.showCounter );
            state.showCounter = !state.showCounter;
            console.log("On toggle end " + state.showCounter );
        },
        reset(state){
            state.counter=0;
        }
    }
});

const counterReducer = (state = initialState, action) => {

    if(action.type === 'increment'){
        return {
            counter: state.counter + Number(action.factor),
            showCounter:state.showCounter
        }
    }

    if(action.type === 'multiply'){
        return {
            counter: state.counter * Number(action.factor),
            showCounter:state.showCounter
        }
    }

    if(action.type === 'decrement'){
        return {
            counter: state.counter - Number(action.factor),
            showCounter:state.showCounter
        }
    }

    if(action.type === 'toggle'){
        return {
            counter: state.counter,
            showCounter:!state.showCounter
        }
    }

    if(action.type === 'reset'){
        return {
            counter: 0,
            showCounter:true
        }
    }
    return state;
};

//const store = createStore(counterReducer);
const store = configureStore({
    reducer:{counter:counterSlice.reducer}
});

export const counterAction = counterSlice.actions;
export default store;