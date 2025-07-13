"use client";
import { ReactNode } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

type TooltipIconButtonProps = {
  title: string;
  children: ReactNode;
};

export default function TooltipIconButton({ title, children }: TooltipIconButtonProps) {
  return (
    <Tooltip //
      title={title}
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: "14px",
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "#4F4F4F",
          },
        },
      }}
    >
      <IconButton>{children}</IconButton>
    </Tooltip>
  );
}
