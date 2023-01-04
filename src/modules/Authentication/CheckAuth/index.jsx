import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { isAuthenticatedAtom } from "../../../shared/global-state/authData";

export const CheckAuth = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};
