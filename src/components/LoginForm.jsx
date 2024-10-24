import React from "react";
import { useNavigate } from "react-router-dom";
import resolveRouteByLogin from "@/utils/resolveRouteByLogin";
import { useState } from "react";
import { Button, Label, Flowbite, TextInput } from "flowbite-react";

const LoginForm = () => {
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

  const customTheme = {
    button: {
      color: {
        orangeHover: "bg-[#ff8d4e] hover:bg-[#d3723e]",
      },
    },
    input: {
      colors: {
        orangeFocus: "focus:ring-[#ff8d4e] focus:border-[#ff8d4e]",
      },
    },
  };

  return (
    <>
      <section className="login section-center">
        <Flowbite theme={{ theme: customTheme }}>
          <div className="welcome-user">
            <h1>Welcome back!</h1>
            <p>Please enter your details to continue</p>
          </div>

          <form className="login-form flex max-w-md flex-col gap-4">
            <div className="email-field">
              <div className="email-label">
                <Label htmlFor="email" value="Your UP Mail" />
              </div>
              <TextInput
                id="email"
                size={100}
                value={email}
                placeholder="name@up.edu.ph"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="password-field">
              <div className="password-label">
                <Label htmlFor="password" value="Your Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                color="orangeHover"
                className="text-white w-[100%]"
              >
                Login
              </Button>
            </div>
          </form>
        </Flowbite>
      </section>
    </>
  );
};

export default LoginForm;
