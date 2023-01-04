import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabase";
import { isAuthenticatedAtom, authDataAtom } from "./global-state/authData";
import { useAtom } from "jotai";

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [authData, setAuthData] = useAtom(authDataAtom);
  const navigate = useNavigate();
  const menu = useRef(null);
  const items = [
    {
      label: "Navigasi",
      items: [
        {
          label: "Upload Aplikasi",
          icon: "pi pi-upload",
          command: () => navigate("/add-project"),
        },
        {
          label: "Semua Aplikasi",
          icon: "pi pi-code",
          command: () => navigate("/browse"),
        },
      ],
    },
    {
      label: "Profil",
      items: [
        {
          label: "Profil Saya",
          icon: "pi pi-user",
          command: () => navigate("/profile"),
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: async () => {
            window.localStorage.removeItem("if_user");
            setIsAuthenticated(false);
            setAuthData(null);
            let { error } = await supabase.auth.signOut();
            if (!error) {
              navigate("/login");
            } else {
              console.log(error);
            }
          },
        },
      ],
    },
  ];

  return (
    <div className="w-full h-16 px-5 flex items-center justify-between lg:px-16 md:px-12 lg:h-20 bg-slate-100">
      <Link to="/">
        <div className="text-sm font-medium">
          <span className="text-lg leading-3">IF SGD</span> <br /> SHOWCASE
        </div>
      </Link>
      <div className="flex items-center">
        <Menu model={items} popup ref={menu} id="popup_menu" className="z-50" />
        <button
          onClick={(event) => menu.current.toggle(event)}
          aria-controls="popup_menu"
          aria-haspopup
          className="h-8 w-8 rounded-full"
        >
          <i className="pi pi-ellipsis-v" style={{ fontSize: "large" }}></i>
        </button>
      </div>
    </div>
  );
};
