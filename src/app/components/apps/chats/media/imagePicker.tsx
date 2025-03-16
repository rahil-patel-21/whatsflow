// Imports
import { useState, useRef } from "react";
import { IconPhoto, IconX } from "@tabler/icons-react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MediaTextInput from "./mediaTextInput";

const ImageFilePicker = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = e.target?.result as string;

        img.onload = () => {
          // Get original width and height
          const originalWidth = img.width;
          const originalHeight = img.height;

          // Calculate 45% of the original size while maintaining aspect ratio
          const newWidth = originalWidth * 0.45;
          const newHeight = originalHeight * 0.45;

          // Create a canvas to resize the image
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert canvas to a data URL
            const resizedImageUrl = canvas.toDataURL("image/jpeg", 1); // Adjust quality if needed
            setResizedImageUrl(resizedImageUrl);
            setIsDialogOpen(true); // Open the dialog after resizing
          }
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input dialog
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog

    // Clear the file input value to allow re-selection of the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input
      />

      {/* IconButton to trigger file input */}
      <IconButton aria-label="upload image" onClick={handleButtonClick}>
        <IconPhoto stroke={1.5} size="20" />
      </IconButton>

      {/* Dialog to preview resized image */}
      <Dialog
        open={isDialogOpen}
        onClose={(event, reason) => {
          // Prevent closing on backdrop click or Escape key
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          handleCloseDialog();
        }}
        disableEscapeKeyDown // Prevent closing with Escape key
      >
        {/* Dialog Title with Close Icon */}
        <DialogTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handleCloseDialog}>
              <IconX stroke={1.5} size={20} />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent>
          {resizedImageUrl && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Image */}
              <img
                src={resizedImageUrl}
                alt="Resized"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <MediaTextInput />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageFilePicker;
