import React, { useState } from "react";
import logOut from "@/utils/useLogout";
import { useNavigate } from "react-router-dom";
import resolveRouteByLogin from "@/utils/resolveRouteByLogin";
import NavbarLogin from "@/components/NavbarLogin";
import Footer from "@/components/Footer";
import "../css/Helpers.css"


const LoginPage = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //for login page, create handler function and you can get the corresponding route by using the resolveRouteByLogin function
  //params are email and password from input
  //don't forget to add `await` before function call and add `async` to the handler function
  //you can use the return value which is a route to navigate to the next page
  async function handleLogin() {
    const route = await resolveRouteByLogin(email, password);
    navigate(route);
  }

  return (
    <>
      <NavbarLogin />

      <section className="login section-center">
        <div className={"mainContainer"}>
          <div className="welcome-user">
            <h2>Welcome Back!</h2>
            <p>Please enter your details to continue</p>
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
          {/* <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={() => logOut()}
              value={"Log out"}
            />
          </div> */}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LoginPage;
