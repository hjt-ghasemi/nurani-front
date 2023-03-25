import { useContext, useEffect } from "react";
import { redirect } from "react-router-dom";
import { AuthContext } from "../contexts";
import authSerivce from "../services/authService";

const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    authSerivce.logout();
    setAuth(null);
    redirect("/login");
  }, []);
  return null;
};

export default Logout;
