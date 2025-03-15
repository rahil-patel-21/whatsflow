// Imports
import React from "react";
import Box from "@mui/material/Box";
import {  IconSend } from "@tabler/icons-react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { sendMsg } from "@/store/apps/chat/ChatSlice";
import { useSelector, useDispatch } from "@/store/hooks";
import { sendTargetMsg } from "@/services/chat/mainChat";
import { setActiveMainChats } from "@/store/apps/chat/ChatReducer";

const MediaTextInput = () => {
  const [msg, setMsg] = React.useState<any>("");
  const dispatch = useDispatch();

  const id = useSelector((state) => state.chatReducer.chatContent);
  const chatState = useSelector((state)=> state.reducerChat) ?? {};

  const handleChatMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const newMsg = { id, msg };

  const onChatMsgSubmit = (e: any) => {
    const msgData = {
      content: msg,
      fromMe: true,
      id: "PENDING",
      timestamp: Math.floor(new Date().getTime() / 1000),
      type: "chat",
    };
    const chats = [...(chatState.activeMainChats ?? [])];
    chats.push(msgData);
    dispatch(setActiveMainChats(chats));
    sendTargetMsg(chatState.activeRecentChat?.source ?? '', msg);

    e.preventDefault();
    e.stopPropagation();
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

        <InputBase
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder="Add a caption"
          size="small"
          type="text"
          inputProps={{ "aria-label": "Add a caption", autoComplete: "off" }}
          onChange={handleChatMsgChange.bind(null)}
        />
        <IconButton
          aria-label="delete"
          onClick={() => {
            dispatch(sendMsg(newMsg));
            setMsg("");
          }}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default MediaTextInput;
