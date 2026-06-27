import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, unsubscribeObserver } from "../firebase/auth";

function useLogOut() {
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        unsubscribeObserver();
        navigate("/");
      })
      .catch((error) => {});
  };

  return logOut;
}

export default useLogOut;
