import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState : null,
    reducers : {
        addfeed:(state , action)=>{
            return action.payload;
        },
        removefeed:(state , action) =>{
            const newfeed = state.filter((user)=>user._id !== action.payload)
            return newfeed;
        }
    },
})
export const {addfeed,removefeed} = feedSlice.actions;
export default feedSlice.reducer;