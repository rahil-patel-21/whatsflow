// Imports
import React from "react";
import Box from "@mui/material/Box";
import { IconSend } from "@tabler/icons-react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { sendMsg } from "@/store/apps/chat/ChatSlice";
import { useSelector, useDispatch } from "@/store/hooks";
import { sendTargetMsg } from "@/services/chat/mainChat";
import { setActiveMainChats } from "@/store/apps/chat/ChatReducer";

interface InputProps {
  callback: (message: string, source?: string) => void; // Callback function to return the updated message
}

const MediaTextInput: React.FC<InputProps> = ({ callback }) => {
  const [inputKey, setInputKey] = React.useState(0); // Key to force re-render
  const [msg, setMsg] = React.useState<any>("");
  const dispatch = useDispatch();

  const id = useSelector((state) => state.chatReducer.chatContent);
  const chatState = useSelector((state) => state.reducerChat) ?? {};

  const newMsg = { id, msg };

  const handleChatMsgChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { value } = event.target as HTMLInputElement;

    // Check if Shift + Enter is pressed
    if (event.nativeEvent.shiftKey && event.nativeEvent.key === "Enter") {
      // Add a new line to the message
      const updatedMsg = msg + "\n";
      setMsg(updatedMsg);
      callback(updatedMsg); // Invoke the callback with the updated message
    } else if (event.nativeEvent.key === "Enter") {
      callback(value, "Enter");
      setMsg("");
      setInputKey((prevKey) => prevKey + 1); // Change the key to force re-render
      event.preventDefault();
    }
    // Update the message normally
    else {
      setMsg(value);
      callback(value); // Invoke the callback with the updated message
    }
  };

  const onChatMsgSubmit = (e: any) => {
    const msgData = {
      caption: '',
      content: msg,
      fromMe: true,
      id: "mediaTextInput",
      timestamp: Math.floor(new Date().getTime() / 1000),
      type: "chat",
    };
    const chats = [...(chatState.activeMainChats ?? [])];
    chats.push(msgData);
    dispatch(setActiveMainChats(chats));
    sendTargetMsg(chatState.activeRecentChat?.source ?? "", msg);

    e.preventDefault();
    e.stopPropagation();
    dispatch(sendMsg(newMsg));
    setMsg("");
  };

  return (
    <Box p={2}>
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <InputBase
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder="Add a caption"
          size="small"
          type="text"
          inputProps={{ "aria-label": "Add a caption", autoComplete: "off" }}
          onKeyDown={handleChatMsgChange} // Use onKeyDown to detect key combinations
          onChange={(e) => {
            callback(e.target.value);
            setMsg(e.target.value);
          }}
        />
        <IconButton
          aria-label="delete"
          onClick={() => {
            callback(msg, "Enter");
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
