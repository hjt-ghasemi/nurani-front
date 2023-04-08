import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollTop from "./components/common/ScrollTop";
import UploadImageForm from "./components/UploadImageFrom";
import AllImages from "./components/AllImages";
import Logout from "./components/Logout";
import "react-toastify/dist/ReactToastify.css";
import Progress from "./components/common/Progress";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContentForm from "./components/ContentForm";
import { Provider } from "react-redux";
import store from "./store/configureStore";

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
      <CssBaseline />
      <ToastContainer />
      <ScrollTop>
        <Provider store={store}>
          <Progress />
          <Routes>
            <Route path="*" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route path="upload-image" element={<UploadImageForm />} />
              <Route path="all-images" element={<AllImages />} />
              <Route path="edit-content" element={<ContentForm />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Routes>
        </Provider>
      </ScrollTop>
    </ThemeProvider>
  );
}

export default App;
