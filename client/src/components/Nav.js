import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/monsters"> Monsters</NavLink>
    </>
  );
}
