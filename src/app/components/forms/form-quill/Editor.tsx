"use client";

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import "./Quill.css";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

import Paper from "@mui/material/Paper";
import ParentCard from "@/app/components/shared/ParentCard";

const Editor = () => {
  const [text, setText] = useState("");

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <ParentCard title="Quill Editor">
      <Paper sx={{ border: `1px solid ${borderColor}` }} variant="outlined">
        <ReactQuill
          value={text}
          onChange={(value: any) => {
            setText(value);
          }}
          placeholder="Type here..."
        />
      </Paper>
    </ParentCard>
  );
};

export default Editor;
