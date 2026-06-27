import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/firebase/auth";
import { db } from "@/firebase/db";
import Loader2 from "@/loaders/Loader2";

const RequireAdmin = ({ children }) => {
  const [user, isLoading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (isLoading) {
        return;
      }

      if (!user) {
        setIsAdmin(false);
        setIsCheckingRole(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userRef);

        setIsAdmin(
          userDocSnap.exists() ? Boolean(userDocSnap.data().isAdmin) : false,
        );
      } catch (error) {
        console.error("Error checking admin access:", error);
        setIsAdmin(false);
      } finally {
        setIsCheckingRole(false);
      }
    };

    checkAccess();
  }, [user, isLoading]);

  if (isLoading || isCheckingRole) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/file-permit" replace />;
  }

  return children;
};

export default RequireAdmin;
