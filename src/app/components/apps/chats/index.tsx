"use client";

// Imports
import Box from "@mui/material/Box";
import { db } from "@/lib/firebase";
import Divider from "@mui/material/Divider";
import { useDispatch } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { fetchRecentChats } from "@/services/chat/recentChat";
import {
  setActiveRecentChat,
  setRecentChats,
} from "@/store/apps/chat/ChatReducer";
import ChatSidebar from "@/app/components/apps/chats/ChatSidebar";
import ChatContent from "@/app/components/apps/chats/ChatContent";
import ChatMsgSent from "@/app/components/apps/chats/ChatMsgSent";

const ChatsApp = () => {
  const dispatch = useDispatch();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    recentChats();
    setupRealTimeListener();
  }, []);

  async function recentChats() {
    const recent_chats = await fetchRecentChats();
    if (recent_chats.length > 0) {
      dispatch(setRecentChats(recent_chats));
      dispatch(setActiveRecentChat(recent_chats[0]));
    }
  }

  // Set up a real-time listener for a specific document
  const setupRealTimeListener = () => {
    const docRef = doc(db, "Recent-Chats", "Default"); // Replace with your collection and document ID

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        recentChats();
      }
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  };

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Left part */}
      {/* ------------------------------------------- */}

      <ChatSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Right part */}
      {/* ------------------------------------------- */}

      <Box
        flexGrow={1}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Chat content section */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
        </Box>

        <Divider />

        {/* Message sending section */}
        <ChatMsgSent />
      </Box>
    </>
  );
};

export default ChatsApp;
