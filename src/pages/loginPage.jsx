import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Login from "../components/login";
import auth from "../services/authService";
import { toast } from "react-toastify";

export default function LoginPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await auth.login(data.get("username"), data.get("password"));
      window.location = "/dashboard";
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Login handleSubmit={handleSubmit} />
    </Container>
  );
}
