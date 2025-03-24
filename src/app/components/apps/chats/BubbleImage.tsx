"use client";

import Image from "next/image";
import ChatMessage from "./BubbleText";
import React, { useState } from "react";

interface BubbleImageProps {
  chat: any;
}

const BubbleImage: React.FC<BubbleImageProps> = ({ chat }) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(
    null
  );

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const scaledWidth = naturalWidth * 0.25;
    const scaledHeight = naturalHeight * 0.25;

    // Set the dimensions in state
    setDimensions({ width: scaledWidth, height: scaledHeight });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: chat.fromMe ? "flex-end"  : "flex-start"}}>
      <Image
        src={chat.content}
        alt="attach"
        width={250}
        height={250}
        onLoad={handleImageLoad}
        onClick={() => {
          const newWindow: any = window.open();
          newWindow.document.write(`
            <html>
              <head>
                <title>Image</title>
              </head>
              <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <img src="${chat.content}" alt="Base64 Image" style="max-width: 100%; max-height: 100%;" />
              </body>
            </html>
          `);
          newWindow.document.close();
        }}
        style={{ cursor: "pointer", width: "30%", height: "30%" }}
      />
      {/* Conditionally render the caption if it exists */}
      {chat.caption && (
        <ChatMessage
          chat={chat}
          sx={{
            backgroundColor: chat?.fromMe ? "primary.light" : "grey.100",
            maxWidth: dimensions?.width,
          }}
        />
      )}
    </div>
  );
};

export default BubbleImage;