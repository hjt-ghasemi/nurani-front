import * as React from "react";
import Container from "@mui/material/Container";
import Login from "../components/login";
import authService from "../services/authService";
import { toast } from "react-toastify";
import { AuthContext, LoadingContext } from "../contexts";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { auth, setAuth } = React.useContext(AuthContext);
  const { setLoading } = React.useContext(LoadingContext);

  if (auth) return <Navigate replace to="/dashboard/upload-image" />;

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const token = await authService.login(
        data.get("email"),
        data.get("password"),
        data.get("remember")
      );
      setAuth(token);
    } catch (ex) {
      const { message, errors } = ex.response.data;
      const error =
        (errors && (errors.email[0] || errors.password[0])) || message;
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Login handleSubmit={handleSubmit} />
    </Container>
  );
}
