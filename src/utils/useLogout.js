import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, unsubscribeObserver } from "../firebase/auth";

function useLogOut() {
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        unsubscribeObserver(); 
        navigate("/"); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return logOut;
}

export default useLogOut;
