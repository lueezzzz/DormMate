import React, { useState } from "react";
import logIn from "@/hooks/useLogin";
import logOut from "@/hooks/useLogout";
const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          onClick={() => logIn(email, password)}
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
