import { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div>Login</div>;
  } else {
    return <div>{user.username}</div>;
  }
}

export default Profile;
