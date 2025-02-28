"use client";

// Imports
import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextField = styled((props: any) => <TextField {...props} />)(
  ({ theme }) => ({
    "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      opacity: "0.8",
    },
    "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      opacity: "1",
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[200],
    },
  })
);

const NumericTextField = ({ maxLength, type, ...props }: any) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type !== "numeric") return {};

    // Allow only numeric key presses
    const isNumeric = /^[0-9]$/.test(event.key);
    if (!isNumeric) {
      event.preventDefault(); // Prevent non-numeric input
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (type !== "numeric") return {};

    const pastedData = event.clipboardData.getData("text");
    // Replace anything that's not a digit with an empty string
    const cleanedData = pastedData.replace(/\D/g, "");

    // If the pasted data isn't the same as the cleaned data, we prevent the paste
    if (pastedData !== cleanedData) {
      event.preventDefault();
      // Optionally, insert the cleaned data into the field after paste
      document.execCommand("insertText", false, cleanedData);
    }
  };

  const inputProps: any = {
    ...props.inputProps,
  };

  // Apply maxLength and type-specific rules (for numeric only) if type is 'numeric'
  if (maxLength) {
    inputProps.maxLength = maxLength;
  }
  if (type === "numeric") {
    inputProps.inputMode = "numeric"; // Helps on mobile devices
  }

  return (
    <CustomTextField
      {...props}
      inputProps={inputProps}
      onKeyPress={handleKeyPress} // Handle key press event
      onPaste={handlePaste} // Handle paste event
    />
  );
};

export default NumericTextField;
