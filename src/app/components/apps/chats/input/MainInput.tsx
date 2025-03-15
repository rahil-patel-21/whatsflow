// Imports
import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";

interface MainInputProps {
  callback: (message: string, source?: string) => void; // Callback function to return the updated message
}

const MainInput: React.FC<MainInputProps> = ({ callback }) => {
  const [msg, setMsg] = useState("");
  const [inputKey, setInputKey] = useState(0); // Key to force re-render

  const handleChatMsgChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
    }
    // Update the message normally
    else {
      setMsg(value);
      callback(value); // Invoke the callback with the updated message
    }
  };

  return (
    <InputBase
    key={inputKey} // Force re-render when the key changes
      id="msg-sent"
      fullWidth
      value={msg}
      placeholder="Type a Message"
      size="small"
      type="text"
      multiline // Enable multiline input
      inputProps={{ "aria-label": "Type a Message", autoComplete: "off" }}
      onKeyDown={handleChatMsgChange} // Use onKeyDown to detect key combinations
      onChange={(e) => {
        callback(e.target.value);
        setMsg(e.target.value);
      }}
    />
  );
};

export default MainInput;
