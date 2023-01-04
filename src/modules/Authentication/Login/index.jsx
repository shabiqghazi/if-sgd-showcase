import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../../config/supabase";
import {
  getAuthDataAtom,
  authDataAtom,
} from "../../../shared/global-state/authData";
import { isAuthenticatedAtom } from "../../../shared/global-state/authData";
import { useAtom } from "jotai";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getAuthData, setGetAuthData] = useAtom(getAuthDataAtom);
  const [authData, setAuthData] = useAtom(authDataAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const signInHandler = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data?.session?.user?.aud === "authenticated") {
      setGetAuthData({ user: { id: data.session.user.id } });
      setIsAuthenticated(true);
      navigate("/");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="px-8 py-16 max-w-xl lg:px-16 overflow-hidden lg:overflow-visible m-auto">
        <h1 className="font-semibold text-2xl mb-8">Masuk</h1>
        <form onSubmit={signInHandler}>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <InputText
              type={`email`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-help"
              className="block w-full"
            />
          </div>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <InputText
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="password-help"
              className="block w-full"
            />
          </div>
          <div className="flex justify-end">
            <Button
              label="Submit"
              aria-label="Submit"
              className="p-button-sm"
            />
          </div>
        </form>
        <p className="mt-4">
          Sudah memiliki akun?{" "}
          <Link to={`/register`} className="text-sky-600 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
