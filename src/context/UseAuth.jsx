import React, { use } from "react";
import { Authcontext } from "./AuthContext";

const UseAuth = () => {
  const authinfo = use(Authcontext);
  return authinfo;
};

export default UseAuth;
