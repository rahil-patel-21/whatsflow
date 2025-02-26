// Imports
import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  isAccConnected?: boolean;
  accConnectNumber: string; // 10 digit whatsApp number to connect account
  canSendConnectionMsg: boolean;
  isConnectionReqSent: boolean;
}

const initialState: StateType = {
  isAccConnected: false,
  accConnectNumber: "", // 10 digit whatsApp number to connect account
  canSendConnectionMsg: true,
  isConnectionReqSent: false,
};

export const ReducerChat = createSlice({
  name: "reducerChat",
  initialState,
  reducers: {
    setAccConnected: (state: StateType, action) => {
      state.isAccConnected = action.payload;
    },
    // Update whatsApp number to connect account
    setAccConnectNumber: (state: StateType, action) => {
      state.accConnectNumber = action.payload;
    },
    setCanSendConnectionMsg: (state: StateType, action) => {
      state.canSendConnectionMsg = action.payload;
    },
    setIsConnectionReqSent: (state: StateType, action) => {
      state.isConnectionReqSent = action.payload;
    },
  },
});

export const {
  setAccConnected,
  setAccConnectNumber,
  setCanSendConnectionMsg,
  setIsConnectionReqSent,
} = ReducerChat.actions;

export default ReducerChat.reducer;
