import { createSlice } from "@reduxjs/toolkit";


const counterSlice = createSlice({
    name: 'Counter',
    initialState:0,
    reducers: {
        increase(state){
            return state +1 ;
        },
        decrease(state){
            return state -1;
        },
    },
});


const { actions, reducer} = counterSlice;
export const { increase, decrease} = actions; //name export
export default reducer; //default export