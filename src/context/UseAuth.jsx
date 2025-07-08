import React, { use } from "react";

const UseAuth = () => {
  const authinfo = use(Authcontext);
  return authinfo;
};

export default UseAuth;
