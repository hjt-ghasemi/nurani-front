import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Login from "../components/login";

export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(
      data.get("username"),
      data.get("password"),
      data.get("remember")
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Login handleSubmit={handleSubmit} />
    </Container>
  );
}
