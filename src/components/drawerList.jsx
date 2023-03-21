import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation, useNavigate } from "react-router-dom";

const DrawerList = ({ open }) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const tabs = [
    { title: "Upload Image", path: "/upload-image", icon: FileUploadIcon },
    { title: "Edit Content", path: "/edit-content", icon: EditIcon },
    { title: "All Images", path: "/all-images", icon: ImageSearchIcon },
  ];

  const isActive = (path) => {
    return loc.pathname.includes(path) ? "primary" : "";
  };

  return (
    <List>
      {tabs.map((tab, index) => (
        <ListItem
          disablePadding
          sx={{
            display: "block",
          }}
          onClick={() => navigate(`/dashboard${tab.path}`)}
          key={index}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <tab.icon color={isActive(tab.path)} />
            </ListItemIcon>
            <ListItemText sx={{ opacity: open ? 1 : 0 }}>
              {tab.title}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerList;
