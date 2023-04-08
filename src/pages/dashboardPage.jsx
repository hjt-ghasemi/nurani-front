import * as React from "react";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import Drawer from "./../components/Drawer";
import { useSelector } from "react-redux";
import { getToken } from "../store/auth";

export default function DashboardPage() {
  const token = useSelector(getToken);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!token) return <Navigate replace to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawer handleDrawerClose={handleDrawerClose} open={open} />
    </Box>
  );
}
