// Imports
import { createSlice } from "@reduxjs/toolkit";

interface RecentChat {
  content: string;
  caption: string;
  name: string;
  timestamp: number;
  profilePic?: string;
  source: string;
  unReadCounts: number;
}

interface ChatMsg {
  content: string;
  caption: string;
  fromMe: boolean;
  id: string;
  timestamp: number;
  type: string;
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
  activeMainChats: [],
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
      if (action.payload.isForcefully) {
        state.activeRecentChat = action.payload?.chat;
      } else if (!state.activeRecentChat?.source) {
        state.activeRecentChat = action.payload?.chat;
      } else {
        return;
      }

      // Mark chat as read
      if ((action.payload?.chat?.unReadCounts ?? 0) > 0) {
        const targetIndex = state.recentChats.findIndex(
          (el) => el.source == action.payload?.chat?.source
        );
        if (targetIndex != -1) {
          state.recentChats[targetIndex].unReadCounts = 0;
        }
      }
    },
    setActiveMainChats: (state: StateType, action) => {
      state.activeMainChats = action.payload;

      console.log('state.activeRecentChat',state.activeRecentChat?.unReadCounts)

      // Mark chat as read (For Active chat)
      if ((state.activeRecentChat?.unReadCounts ?? 0) > 0) {
        const targetIndex = state.recentChats.findIndex(
          (el) => el.source == (state.activeRecentChat?.source ?? "")
        );
        if (targetIndex != -1) {
          state.recentChats[targetIndex].unReadCounts = 0;
        }
      }
    },
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
