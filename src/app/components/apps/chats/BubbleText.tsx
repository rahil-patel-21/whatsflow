// Imports
import React from "react";
import Box from "@mui/material/Box";

// Define the type for the chat object
interface Chat {
  caption?: string; 
  content: string;
}

// Function to detect URLs and replace them with clickable links
const renderTextWithLinks = (text: string): JSX.Element[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex to detect URLs
  return text.split("\n").map((line, index) => {
    const parts = line.split(urlRegex); // Split the line by URLs
    return (
      <span key={index}>
        {parts.map((part, i) =>
          urlRegex.test(part) ? ( // Check if the part is a URL
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {part}
            </a>
          ) : (
            part // Render normal text
          )
        )}
        <br />
      </span>
    );
  });
};

// Define the props for the ChatMessage component
interface ChatMessageProps {
  chat: Chat;
  sx?: any
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat, sx }) => {
  return (
    <Box
      sx={{
        p: 1,
        maxWidth: "350px",
        whiteSpace: "normal", // Allow text to wrap
        wordWrap: "break-word", // Break long words if necessary
        ...sx,
      }}
    >
      {renderTextWithLinks(chat.caption ?? chat.content)}
    </Box>
  );
};

export default ChatMessage;