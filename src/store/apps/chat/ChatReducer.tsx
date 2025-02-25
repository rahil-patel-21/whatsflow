// Imports
import { createSlice } from '@reduxjs/toolkit';

interface StateType {
    isAccConnected?: boolean;
}

const initialState: StateType = {
  isAccConnected: false,
};

export const ReducerChat = createSlice({
  name: 'reducerChat',
  initialState,
  reducers: {
    setAccConnected: (state: StateType, action) => {
      state.isAccConnected = action.payload;
    },
   
    
  },
});

export const {
    setAccConnected,
} = ReducerChat.actions;

export default ReducerChat.reducer;
