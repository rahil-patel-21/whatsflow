"use client";

// Imports
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import ChatSidebar from "@/app/components/apps/chats/ChatSidebar";
import ChatContent from "@/app/components/apps/chats/ChatContent";
import ChatMsgSent from "@/app/components/apps/chats/ChatMsgSent";

const ChatsApp = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

      <Box flexGrow={1} sx={{ maxHeight: '88vh' }}>
        <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
        <Divider />
        <ChatMsgSent />
      </Box>
    </>
  );
};

export default ChatsApp;
