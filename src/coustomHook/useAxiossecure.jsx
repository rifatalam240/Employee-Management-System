import axios from "axios";
import { useEffect } from "react";
import UseAuth from "../context/UseAuth";

const axiossecure = axios.create({
  baseURL: `http://localhost:5000`,
});

const useAxiossecure = () => {
  const { user } = UseAuth();

  useEffect(() => {
    const interceptor = axiossecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const idToken = await user.getIdToken();
          if (idToken) {
            config.headers.authorization = `Bearer ${idToken}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiossecure.interceptors.request.eject(interceptor);
    };
  }, [user]);

  return axiossecure;
};

export default useAxiossecure;
