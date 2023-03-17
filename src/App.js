import React from "react";
import LoginPage from "./pages/loginPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import auth from "./services/authService";
import ScrollTop from "./components/scrollTop";
import DashboardPage from "./pages/dashboardPage";

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
  const user = auth.getCurrentUser();
  return (
    <ThemeProvider theme={theme}>
      <ScrollTop>{user ? <DashboardPage /> : <LoginPage />}</ScrollTop>
    </ThemeProvider>
  );
}

export default App;
