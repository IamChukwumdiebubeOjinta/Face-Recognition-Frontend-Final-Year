import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="fixed top-0 left-0 z-20 w-full px-4">
        <ul className="relative flex flex-wrap items-center justify-between px-2 my-2 bg-white border-gray-200 dark:border-gray-600 rounded-3xl backdrop-blur-md bg-opacity-30">
          <NavLink className="logo" to="/">
            <img src="/logo.png" className="size-20" alt="Logo" />
          </NavLink>
          <input type="checkbox" id="check" />

          <span className="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:text-sm [&>li>a]:font-normal [&>li>a]:leading-6 [&>li>a]:text-gray-700">
            <li>
              <NavLink
                exact="true"
                to="/"
                activeclassname="active"
                className="nav-link"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth" activeclassname="active" className="nav-link">
                Auth
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/web-cam"
                activeclassname="active"
                className="nav-link"
              >
                WebCam
              </NavLink>
            </li>

            <label htmlFor="check" className="close-menu">
              X
            </label>
          </span>

          <label htmlFor="check" className="open-menu">
            Menu
          </label>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
