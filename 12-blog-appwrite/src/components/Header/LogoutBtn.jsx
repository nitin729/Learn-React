import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .then(() => navigate("/"));
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200  hover:bg-black text-xl rounded-sm hover:text-white hover:rounded-md "
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
