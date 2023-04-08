import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken, logout } from "../store/auth";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    dispatch(logout);
  }, []);

  return token ? null : <Navigate replace to="/login" />;
};

export default Logout;
