import React, { useState,ReactElement } from "react";
import { RiMenuLine } from "react-icons/ri";
import { PiUserSwitch } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";


interface Props{
  children: ReactElement
}

const NavMenu = (props:Props) => {
  const menus = [
    { name: "Inicio", link: "/", icon: FaHome },
    { name: "Usuarios", link: "/", icon: FaUser },
    { name: "Roles", link: "/rol", icon: PiUserSwitch },
    { name: "Proveedores", link: "/supplier", icon: FiMessageSquare },
    { name: "Productos", link: "/product", icon: TbReportAnalytics},
    { name: "Ventas", link: "/", icon: FiShoppingCart },
    { name: "Detalle Ventas", link: "/", icon: TbReportAnalytics },
    { name: "Cliente", link: "/cliente", icon: FiShoppingCart },

  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div className={`bg-dark-purple min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 `}>
        <div className="py-3 flex justify-end">
          <RiMenuLine
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link to={menu?.link} key={i} className={`  group flex items-center text-sm  gap-3.5 font-medium p-1 hover:bg-gray-600 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "28" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              {/* <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2> */}
              <hr className="text-white"></hr>
            </Link>
            
          ))}
        </div>
      </div>

      <div className="w-full m-3">
        {props.children}
      </div>
    </section>
  );
};

export default NavMenu;