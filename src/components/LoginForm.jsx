import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import resolveRouteByLogin from "@/utils/resolveRouteByLogin";
import { Label, Flowbite } from "flowbite-react";
import { ClassicSpinner } from "react-spinners-kit";
import "../css/Login.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setIsLoggingIn] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const navigate = useNavigate();


  async function handleLogin() {
    setIsLoggingIn(true);
    try {
      const route = await resolveRouteByLogin(email, password);
      navigate(route);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
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
              <Input
                id="email"
                size={100}
                value={email}
                placeholder="name@up.edu.ph"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border-none"
                required
              />
            </div>

            <div className="password-field">
              <div className="password-label">
                <Label htmlFor="password" value="Your Password" />
              </div>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100"
                required
              />
            </div>

            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-sm text-[#ff8d4e] hover:underline">
                    Forgot password?
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="forgot-email" value="Enter your email" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="name@up.edu.ph"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                    />
                  </div>
                  <DialogFooter>
                    {/*  here ang button para sa functionality*/}
                    <Button
                      className="bg-[#ff8d4e] hover:bg-[#d3723e] text-white "
                      onClick={() => {
                        console.log(
                          "Send password reset email to:",
                          forgotPasswordEmail
                        );
                      }}
                    >
                      Send Reset Link
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="bg-[#ff8d4e] hover:bg-[#d3723e] text-white w-[100%] "
                disabled={loggingIn}
              >
                {loggingIn ? (
                  <ClassicSpinner size={20} color="white" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </Flowbite>
      </section>
    </>
  );
};

export default LoginForm;
