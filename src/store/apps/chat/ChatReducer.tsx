// Imports
import { createSlice } from "@reduxjs/toolkit";

interface RecentChat {
  content: string,
  name: string,
  timestamp: number
}

interface StateType {
  isAccConnected?: boolean;
  accConnectNumber: string; // 10 digit whatsApp number to connect account
  canSendConnectionMsg: boolean;
  isConnectionReqSent: boolean;
  recentChats: RecentChat[];
}

const initialState: StateType = {
  isAccConnected: false,
  accConnectNumber: "", // 10 digit whatsApp number to connect account
  canSendConnectionMsg: true,
  isConnectionReqSent: false,
  recentChats: []
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
    setRecentChats: (state: StateType, action) => {
      state.recentChats = action.payload;
    }
  },
});

export const {
  setAccConnected,
  setAccConnectNumber,
  setCanSendConnectionMsg,
  setIsConnectionReqSent,
  setRecentChats,
} = ReducerChat.actions;

export default ReducerChat.reducer;
