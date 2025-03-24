// Imports
import React, { useState } from "react";
import MediaTextInput from "./mediaTextInput";
import { STATIC_BASE64_IMAGE } from "@/constants/strings";

const MediaDialogue = () => {
  const [imageHeight, setImageHeight] = useState("auto");
  const [imageWidth, setImageWidth] = useState("auto");

  // Handle image load event
  const handleImageLoad = (event: any) => {
    const naturalHeight = event.target.naturalHeight; // Get the natural height of the image
    setImageHeight(`${naturalHeight / 2.75}px`); // Set the height to half of the natural height
    const naturalWidth = event.target.naturalWidth; // Get the natural height of the image
    setImageWidth(`${naturalWidth / 2}px`); // Set the height to half of the natural height
  };

  return (
    <>
      {true && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              flexDirection: "column",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "100%",
              maxHeight: "90vh", // Limit the image height to 60% of the viewport height
              overflow: "hidden", // Hide overflow if the image is too large
            }}
          >
            {/* Image */}
            <img
              src={STATIC_BASE64_IMAGE}
              alt="Preview"
              onLoad={handleImageLoad}
              style={{
                maxWidth: "100%", // Ensure the image doesn't exceed the container width
                maxHeight: "100%", // Ensure the image doesn't exceed the container height
                width: imageWidth, // Maintain the image's original width
                height: imageHeight, // Maintain the image's original height
                objectFit: "contain", // Ensure the image fits within the container without stretching
              }}
            />

          </div>
        </div>
      )}
    </>
  );
};

export default MediaDialogue;
