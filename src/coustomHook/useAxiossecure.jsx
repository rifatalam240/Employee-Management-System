import axios from "axios";
import React, { useEffect } from "react";
import UseAuth from "../context/UseAuth";

const axiossecure = axios.create({
  baseURL: `http://localhost:5000`, // অথবা VITE_API_BASE_URL ইউজ করতে পারো
});

const useAxiossecure = () => {
  const { user } = UseAuth();

  useEffect(() => {
    // Interceptor যুক্ত করা
    const interceptor = axiossecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // Component unmount হলে interceptor বন্ধ করে দাও
    return () => {
      axiossecure.interceptors.request.eject(interceptor);
    };
  }, [user?.accessToken]);

  return axiossecure;
};

export default useAxiossecure;
