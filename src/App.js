import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/loginPage";
import ScrollTop from "./components/scrollTop";
import DashboardPage from "./pages/dashboardPage";
import UploadImage from "./components/uploadImage";
import AllImages from "./components/allImages";
import EditContent from "./components/editContent";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A3B95",
    },
  },
  typography: {
    fontFamily: [
      '"DM Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <ScrollTop>
        <Routes>
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="upload-image" element={<UploadImage />} />
            <Route path="all-images" element={<AllImages />} />
            <Route path="edit-content" element={<EditContent />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </ScrollTop>
    </ThemeProvider>
  );
}

export default App;
