"use client";

// Imports
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import ChatSidebar from "@/app/components/apps/chats/ChatSidebar";
import ChatContent from "@/app/components/apps/chats/ChatContent";
import ChatMsgSent from "@/app/components/apps/chats/ChatMsgSent";
import { Skeleton } from "@mui/material";

const LoadingConnection = () => {
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

export default LoadingConnection;
