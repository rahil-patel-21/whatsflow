"use client";

// Imports
import React, { useEffect, useRef } from "react";
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
import Image from "next/image";
import { getChat } from "@/services/chat/mainChat";
import { setActiveMainChats } from "@/store/apps/chat/ChatReducer";
import { useDispatch } from "react-redux";

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
  }, [chatState.activeRecentChat]);

  async function funGetChats() {
    const chats = await getChat(chatState.activeRecentChat?.source ?? "");
    dispatch(setActiveMainChats(chats));
    scrollToBottom();
  }

  return (
    <Box>
      {chatDetails ? (
        <Box >
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box position="sticky" top={0} zIndex={100} bgcolor="white">
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

          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}
          <Box display="flex" flexDirection="column" height="100%">
            {/* ------------------------------------------- */}
            {/* Chat Messages */}
            {/* ------------------------------------------- */}
            <Box
              ref={containerRef}
              sx={{
                flexGrow: 1,
                height: "calc(100vh - 120px)", // Adjust for the header's height
                overflowY: "auto",
                padding: 2,
              }}
            >
              <Box>
                {chatState.activeMainChats.map((chat) => {
                  return (
                    <Box key={chat.id}>
                      {chat.fromMe ? (
                        <Box display="flex">
                          <Box>
                            {chat.type === "chat" ? (
                              <Box
                                sx={{
                                  p: 1,
                                  backgroundColor: "grey.100",
                                  mr: "auto",
                                  maxWidth: "320px",
                                }}
                              >
                                {chat.content}
                              </Box>
                            ) : null}
                            {chat.type === "image" ? (
                              <Box
                                sx={{
                                  overflow: "hidden",
                                  lineHeight: "0px",
                                }}
                              >
                                <Image
                                  src={chat.content}
                                  alt="attach"
                                  width="150"
                                  height="150"
                                />
                              </Box>
                            ) : null}
                            {chat.timestamp ? (
                              <Typography
                                variant="body2"
                                color="grey.400"
                                mb={1}
                              >
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
                        <Box
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
                              <Box
                                sx={{
                                  p: 1,
                                  backgroundColor: "primary.light",
                                  ml: "auto",
                                  maxWidth: "320px",
                                }}
                              >
                                {chat.content}
                              </Box>
                            ) : null}
                            {/* {chat.type === "image" ? (
                              <Box
                                sx={{ overflow: "hidden", lineHeight: "0px" }}
                              >
                                <Image
                                  src={chat.msg}
                                  alt="attach"
                                  width="250"
                                  height="165"
                                />
                              </Box>
                            ) : null} */}
                            {chat.timestamp ? (
                              <Typography
                                variant="body2"
                                color="grey.400"
                                mb={1}
                              >
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
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* ------------------------------------------- */}
            {/* Chat Right Sidebar Content */}
            {/* ------------------------------------------- */}
            {/* {open ? (
              <Box flexShrink={0}>
                <ChatInsideSidebar
                  isInSidebar={lgUp ? open : !open}
                  chat={chatDetails}
                />
              </Box>
            ) : null} */}
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
          {/* ------------------------------------------- */}
          {/* if No Chat Content */}
          {/* ------------------------------------------- */}
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
      )}
    </Box>
  );
};

export default ChatContent;
