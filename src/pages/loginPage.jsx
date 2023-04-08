import * as React from "react";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { getToken, logIn } from "../store/auth";

export default function LoginPage() {
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  if (token) return <Navigate replace to="/dashboard/upload-image" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      logIn(data.get("email"), data.get("password"), data.get("remember"))
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <LoginForm handleSubmit={handleSubmit} />
    </Container>
  );
}
