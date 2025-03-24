"use client";

// Imports
import { db } from "@/lib/firebase";
import React, { useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IconDotsVertical, IconMenu2 } from "@tabler/icons-react";
import { useSelector } from "@/store/hooks";
import { ChatsType } from "../../../(DashboardLayout)/types/apps/chat";
import { formatDistanceToNowStrict } from "date-fns";
import { getChat } from "@/services/chat/mainChat";
import { setActiveMainChats } from "@/store/apps/chat/ChatReducer";
import { useDispatch } from "react-redux";
import ChatMsgSent from "./ChatMsgSent";
import ChatMessage from "./BubbleText";
import BubbleImage from "./BubbleImage";

interface ChatContentProps {
  toggleChatSidebar: () => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  toggleChatSidebar,
}: any) => {
  const dispatch = useDispatch();
  const containerRef: any = useRef(null);
  const [open, setOpen] = React.useState(true);

  const chatDetails: ChatsType = useSelector(
    (state) => state.chatReducer.chats[state.chatReducer.chatContent - 1]
  );
  const chatState = useSelector((state) => state.reducerChat);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    funGetChats();
    setupRealTimeListener();
  }, [chatState.activeRecentChat]);

  async function funGetChats() {
    const chats = await getChat(chatState.activeRecentChat?.source ?? "");
    dispatch(setActiveMainChats(chats));
    scrollToBottom();
  }

  // Set up a real-time listener for a specific document
  const setupRealTimeListener = () => {
    if (!chatState.activeRecentChat?.source) return {};

    const docRef = doc(db, "Main-Chats", chatState.activeRecentChat?.source);

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        funGetChats();
      }
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  };

  return chatDetails ? (
    <Box>
      {/* Header Part */}
      <Box position="sticky" bgcolor="white">
        <Box display="flex" alignItems="center" px={2} py={1}>
          <Box
            sx={{
              display: { xs: "block", md: "block", lg: "none" },
              mr: "5px",
            }}
          >
            <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
          </Box>
          <ListItem key={chatDetails.id} dense disableGutters>
            <ListItemAvatar>
              <Badge
                color={
                  chatDetails.status === "online"
                    ? "success"
                    : chatDetails.status === "busy"
                    ? "error"
                    : chatDetails.status === "away"
                    ? "warning"
                    : "secondary"
                }
                variant="dot"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                overlap="circular"
              >
                <Avatar
                  alt={
                    chatState.activeRecentChat?.profilePic ??
                    chatDetails.thumb ??
                    ""
                  }
                  src={
                    chatState.activeRecentChat?.profilePic ??
                    chatDetails.thumb ??
                    ""
                  }
                  sx={{ width: 45, height: 45 }}
                />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h5">
                  {chatState.activeRecentChat?.name ?? ""}
                </Typography>
              }
              secondary={chatDetails.status}
            />
          </ListItem>
          <Stack direction={"row"}>
            <IconButton aria-label="sidebar" onClick={() => setOpen(!open)}>
              <IconDotsVertical stroke={1.5} />
            </IconButton>
          </Stack>
        </Box>
        <Divider />
      </Box>

      {/* Chat Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 160px)", // Adjust for the header's height
          overflowY: "auto",
        }}
        ref={containerRef}
      >
        {/* Chat Messages */}
        <Box
          sx={{
            flexGrow: 1,
            padding: 2,
          }}
        >
          {chatState.activeMainChats.map((chat) => {
            // Left bubble
            return chat.fromMe !== true ? (
              <Box key={chat.id} mb={1} display="flex" alignItems="flex-start">
                <Box
                  key={chat.id}
                  alignItems="flex-start"
                  display="flex"
                  flexDirection={"column"}
                >
                  {chat.type === "chat" ? (
                    <ChatMessage
                      chat={chat}
                      sx={{ backgroundColor: "grey.100", mr: "auto" }}
                    />
                  ) : null}
                  {chat.type === "image" ? <BubbleImage chat={chat} /> : null}
                  {chat.timestamp ? (
                    <Typography variant="body2" color="grey.400" mb={1}>
                      {formatDistanceToNowStrict(
                        new Date(chat.timestamp * 1000),
                        {
                          addSuffix: false,
                        }
                      )}{" "}
                      ago
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            ) : (
              // Right bubble
              <Box
                key={chat.id}
                mb={1}
                display="flex"
                alignItems="flex-end"
                flexDirection="row-reverse"
              >
                <Box
                  alignItems="flex-end"
                  display="flex"
                  flexDirection={"column"}
                >
                  {chat.type === "chat" ? (
                    <ChatMessage
                      chat={chat}
                      sx={{ backgroundColor: "primary.light", ml: "auto" }}
                    />
                  ) : null}
                  {chat.type === "image" ? <BubbleImage chat={chat} /> : null}
                  {chat.timestamp ? (
                    <Typography variant="body2" color="grey.400" mb={1}>
                      {formatDistanceToNowStrict(
                        new Date(chat.timestamp * 1000),
                        {
                          addSuffix: false,
                        }
                      )}
                      ago
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Chat Input (Sticky at the Bottom) */}
        <Box
          position="sticky"
          bottom={0}
          bgcolor="white"
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            padding: 2,
          }}
        >
          <ChatMsgSent />
        </Box>
      </Box>

    </Box>
  ) : (
    <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
      <Box
        sx={{
          display: { xs: "flex", md: "flex", lg: "none" },
          mr: "10px",
        }}
      >
        <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
      </Box>
      <Typography variant="h4">Select Chat</Typography>
    </Box>
  );
};

export default ChatContent;
