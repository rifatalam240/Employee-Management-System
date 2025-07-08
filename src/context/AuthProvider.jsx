import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
// import { auth } from "./firebase.config";
import { Authcontext } from "./Authcontext";
import { auth } from "../../firebase.config";
const googleprovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createuser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateprofilepic = (profileinfo) => {
    return updateProfile(auth.currentUser, profileinfo);
  };
  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const sociallogin = () => {
    return signInWithPopup(auth, googleprovider);
  };
  const signout = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      //   console.log("Auth changed:", currentUser);
    });

    return () => unsubscribe(); //  cleanup function
  }, []);
  const authinfo = {
    createuser,
    signout,
    signin,
    user,
    sociallogin,
    loading,
    updateprofilepic,
  };
  return (
    <Authcontext.Provider value={authinfo}>{children}</Authcontext.Provider>
  );
};

export default AuthProvider;
