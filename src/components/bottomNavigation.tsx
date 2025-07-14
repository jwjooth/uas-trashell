"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { IoHome } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        router.push("/home");
        break;
      case 1:
        router.push("/orders");
        break;
      case 2:
        router.push("/login");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        borderTop: "1px solid #ccc",
        bgcolor: "background.paper",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction label="Beranda" icon={<IoHome />} />
        <BottomNavigationAction label="Pesanan" icon={<FaTruckFast />} />
        <BottomNavigationAction label="Akun" icon={<MdAccountCircle />} />
      </BottomNavigation>
    </Box>
  );
}