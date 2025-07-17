// import React, { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// // import { auth } from "./firebase.config";
// // import { Authcontext } from "./Authcontext";
// import { auth } from "../../firebase.config";
// import { Authcontext } from "./AuthContext";
// const googleprovider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {em
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createuser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const updateprofilepic = (profileinfo) => {
//     return updateProfile(auth.currentUser, profileinfo);
//   };
//   const signin = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };
//   const sociallogin = () => {
//     return signInWithPopup(auth, googleprovider);
//   };
//   const signout = () => {
//     setLoading(true);
//     return signOut(auth);
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//       //   console.log("Auth changed:", currentUser);
//     });

//     return () => unsubscribe(); //  cleanup function
//   }, []);
//   const authinfo = {
//     createuser,
//     signout,
//     signin,
//     user,
//     sociallogin,
//     loading,
//     updateprofilepic,
//   };
//   return (
//     <Authcontext.Provider value={authinfo}>{children}</Authcontext.Provider>
//   );
// };

// export default AuthProvider;
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
import { auth } from "../../firebase.config";
import { Authcontext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [role, setRole] = useState(null); // Backend role (hr / employee / admin)
  const [loading, setLoading] = useState(true);

  // Firebase create user
  const createuser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Firebase sign in
  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const sociallogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update Firebase profile
  const updateprofilepic = (profileinfo) => {
    return updateProfile(auth.currentUser, profileinfo);
  };

  // Sign out
  const signout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Firebase Auth state observer + fetch role from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await fetch(`http://localhost:5000/users/${currentUser.email}`);
          const dbUser = await res.json();
          setRole(dbUser?.role || null);
        } catch (error) {
          console.error("Role fetch failed:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Context value
  const authinfo = {
    user,           // Firebase user
    role,           // Role from backend (admin/hr/employee)
    loading,
    createuser,
    signin,
    signout,
    sociallogin,
    updateprofilepic,
  };

  return (
    <Authcontext.Provider value={authinfo}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthProvider;
