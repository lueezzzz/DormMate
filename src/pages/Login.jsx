import React, { useState } from "react";
import logOut from "@/utils/useLogout";
import { useNavigate } from "react-router-dom";
import resolveRouteByLogin from "@/utils/resolveRouteByLogin";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const route = await resolveRouteByLogin(email, password);
    navigate(route);
  }

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(e) => setEmail(e.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(e) => setPassword(e.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={() => handleLogin()}
          value={"Log in"}
        />
      </div>
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={() => logOut()}
          value={"Log out"}
        />
      </div>
    </div>
  );
};

export default LoginPage;
