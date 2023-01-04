import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const menu = useRef(null);
  const items = [
    {
      label: "Otentikasi",
      items: [
        {
          label: "Daftar",
          icon: "pi pi-user-plus",
          command: () => navigate("/register"),
        },
        {
          label: "Masuk",
          icon: "pi pi-sign-in",
          command: () => navigate("/login"),
        },
      ],
    },
  ];

  return (
    <div className="w-full h-16 px-5 flex items-center justify-between lg:px-16 md:px-12 lg:h-20 bg-slate-100">
      <Link to="/">
        <div className="text-sm  font-medium">
          <span className="text-lg leading-3">IF SGD</span> <br /> SHOWCASE
        </div>
      </Link>
      <div className="flex items-center">
        <Menu model={items} popup ref={menu} id="popup_menu" />
        <i
          className="pi pi-ellipsis-v"
          style={{ fontSize: "large" }}
          onClick={(event) => menu.current.toggle(event)}
          aria-controls="popup_menu"
          aria-haspopup
        ></i>
      </div>
    </div>
  );
};
