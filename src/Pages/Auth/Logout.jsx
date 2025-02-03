import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the logout action to clear user data from the store
    dispatch(logout());

    // Optionally, clear any tokens or user data from local storage
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("userData");
    localStorage.clear();

    // Redirect to the login page or home page
    navigate("/");
  }, [dispatch, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
