import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Button } from "primereact/button";
import supabase from "../../../config/supabase";
import { Link } from "react-router-dom";

const Register = () => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    await supabase.auth
      .signUp({
        email,
        password,
      })
      .then(({ data: authData, error }) => {
        if (!error) {
          insertUserData(authData);
        } else {
          console.log(error);
        }
      });
  };
  const insertUserData = async (authData) => {
    await supabase
      .from("users")
      .insert([{ nama, nim, auth_id: authData.user.id }])
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="px-8 py-16 max-w-xl lg:px-16 overflow-hidden lg:overflow-visible m-auto">
        <h1 className="font-semibold text-2xl mb-8">Daftar</h1>
        <form onSubmit={signUpHandler}>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="nama" className="block mb-2">
              Nama
            </label>
            <InputText
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              aria-describedby="nama-help"
              className="block w-full"
            />
          </div>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="nim" className="block mb-2">
              NIM
            </label>
            <InputText
              id="nim"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              aria-describedby="nim-help"
              className="block w-full"
            />
          </div>
          <div className="field mb-4 lg:mb-6">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <InputText
              id="email"
              value={email}
              type="email"
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
          Belum memiliki akun?{" "}
          <Link to={`/login`} className="text-sky-600 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
