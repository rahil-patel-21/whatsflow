// Imports
import { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import MediaTextInput from "./mediaTextInput";
import { sanitizeMsg } from "@/utils/str.service";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import { IconPhoto, IconX } from "@tabler/icons-react";
import DialogContent from "@mui/material/DialogContent";
import { sendMediaMsg } from "@/services/chat/mainChat";
import { useDispatch, useSelector } from "@/store/hooks";
import { setActiveMainChats } from "@/store/apps/chat/ChatReducer";

const ImageFilePicker = () => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const chatState = useSelector((state) => state.reducerChat);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {

        const base64 = reader.result as string;
        setBase64String(base64);

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

  async function funSendMediaMsg() {
    if (!chatState.activeRecentChat?.source || !selectedFile) {
      return;
    }

    setIsDialogOpen(false);

    const data = new FormData();
    data.append("caption", msg);
    data.append("file", selectedFile);
    data.append("number", chatState.activeRecentChat?.source);

    const msgData = {
      caption: msg,
      content: sanitizeMsg(base64String ?? ''),
      fromMe: true,
      id: Math.floor(new Date().getTime() / 1000).toString(),
      timestamp: Math.floor(new Date().getTime() / 1000),
      type: "image",
    };
    const chats = [...(chatState.activeMainChats ?? [])];
    chats.push(msgData);
    dispatch(setActiveMainChats(chats));

    await sendMediaMsg(data);
  }

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
              <MediaTextInput
                callback={(msgContent, source) => {
                  if (msgContent) {
                    setMsg(msgContent);
                  }
                  if (source == "Enter") {
                    funSendMediaMsg();
                  }
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageFilePicker;
