"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";

interface CustomAlertProps {
  icon: React.ReactNode;
  severity: "error" | "warning" | "info" | "success";
  message: string;
  className?: string;
  duration?: number;
  onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ icon, severity, message, className = "", duration = 2500, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`fixed top-22 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-[600px] px-4 ${className}`}>
      <Alert
        icon={icon}
        severity={severity}
        className={`text-sm sm:text-base shadow-md ${severity === "success" ? "bg-green-700 text-white" : ""}`}
        sx={{
          borderRadius: "8px",
          alignItems: "center",
        }}
      >
        {message}
      </Alert>
    </div>
  );
};

export default CustomAlert;
