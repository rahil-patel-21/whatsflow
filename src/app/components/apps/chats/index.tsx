"use client";

// Imports
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useDispatch } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { fetchRecentChats } from "@/services/chat/recentChat";
import { setRecentChats } from "@/store/apps/chat/ChatReducer";
import ChatSidebar from "@/app/components/apps/chats/ChatSidebar";
import ChatContent from "@/app/components/apps/chats/ChatContent";
import ChatMsgSent from "@/app/components/apps/chats/ChatMsgSent";

const ChatsApp = () => {
    const dispatch = useDispatch();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
      recentChats();
    }, []);

  async function recentChats() {
    const recent_chats = await fetchRecentChats();
    if (recent_chats.length > 0) {
      dispatch(setRecentChats(recent_chats))
    }
  }

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
          maxHeight: "88vh", // Keep the maximum height of the entire section
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
