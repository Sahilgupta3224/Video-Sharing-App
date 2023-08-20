import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currUser:null,
  loading:false,
  error:false

}

export const videoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   loginStart: (state)=>{
    state.loading=true
   },
   loginSuccess: (state,action)=>{
    state.loading=false
    state.currUser=action.payload
   },
   loginFailure: (state)=>{
    state.loading=false
    state.error=true
   },
   logout: (state)=>{
    state.currUser=null
    state.loading=false
    state.error=false
   }
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure,logout  } = videoSlice.actions

export default videoSlice.reducer