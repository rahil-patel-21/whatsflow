// Imports
import React from "react";
import Box from "@mui/material/Box";
import MainInput from "./input/MainInput";
import IconButton from "@mui/material/IconButton";
import { sanitizeMsg } from "@/utils/str.service";
import ImageFilePicker from "./media/imagePicker";
import { sendMsg } from "@/store/apps/chat/ChatSlice";
import { useSelector, useDispatch } from "@/store/hooks";
import { sendTargetMsg } from "@/services/chat/mainChat";
import { IconPaperclip, IconSend } from "@tabler/icons-react";
import { setActiveMainChats } from "@/store/apps/chat/ChatReducer";

const ChatMsgSent = () => {
  const [msg, setMsg] = React.useState<any>("");
  const dispatch = useDispatch();

  const id = useSelector((state) => state.chatReducer.chatContent);
  const chatState = useSelector((state) => state.reducerChat) ?? {};

  const newMsg = { id, msg };

  const onChatMsgSubmit = (e: any) => {
    const msgData = {
      content: sanitizeMsg(msg),
      fromMe: true,
      id: "PENDING",
      timestamp: Math.floor(new Date().getTime() / 1000),
      type: "chat",
    };
    const chats = [...(chatState.activeMainChats ?? [])];
    chats.push(msgData);
    dispatch(setActiveMainChats(chats));
    sendTargetMsg(chatState.activeRecentChat?.source ?? "", sanitizeMsg(msg));
    dispatch(sendMsg(newMsg));
    setMsg("");
  };

  return (
    <Box p={2}>
      {/* ------------------------------------------- */}
      {/* sent chat */}
      {/* ------------------------------------------- */}
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        {/* ------------------------------------------- */}
        {/* Emoji picker */}
        {/* ------------------------------------------- */}

        <MainInput
          callback={(e, source) => {
            setMsg(e);
            if (source) {
              onChatMsgSubmit(e);
            }
          }}
        />

        <IconButton
          aria-label="delete"
          onClick={() => {
            dispatch(sendMsg(newMsg));
            setMsg("");
          }}
          disabled={!msg}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>

       <ImageFilePicker/>

        <IconButton aria-label="delete">
          <IconPaperclip stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;
