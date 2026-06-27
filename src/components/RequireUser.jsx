import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";
import Loader2 from "@/loaders/Loader2";

const RequireUser = ({ children }) => {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireUser;
