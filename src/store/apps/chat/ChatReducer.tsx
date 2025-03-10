// Imports
import { createSlice } from "@reduxjs/toolkit";

interface RecentChat {
  content: string,
  name: string,
  timestamp: number,
  profilePic?: string,
  source: string
}

interface ChatMsg {
  content: string,
  fromMe: boolean,
  id: string,
  timestamp: number
  type: string
}

interface StateType {
  isAccConnected?: boolean;
  accConnectNumber: string; // 10 digit whatsApp number to connect account
  canSendConnectionMsg: boolean;
  isConnectionReqSent: boolean;
  recentChats: RecentChat[];
  activeRecentChat?: RecentChat;
  activeMainChats: ChatMsg[];
}

const initialState: StateType = {
  isAccConnected: false,
  accConnectNumber: "", // 10 digit whatsApp number to connect account
  canSendConnectionMsg: true,
  isConnectionReqSent: false,
  recentChats: [],
  activeRecentChat: undefined,
  activeMainChats: []
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
    },
    setActiveRecentChat: (state: StateType, action) => {
      state.activeRecentChat = action.payload;
    },
    setActiveMainChats: (state: StateType, action) => {
      state.activeMainChats = action.payload;
    }
  },
});

export const {
  setAccConnected,
  setAccConnectNumber,
  setCanSendConnectionMsg,
  setIsConnectionReqSent,
  setRecentChats,
  setActiveRecentChat,
  setActiveMainChats,
} = ReducerChat.actions;

export default ReducerChat.reducer;
