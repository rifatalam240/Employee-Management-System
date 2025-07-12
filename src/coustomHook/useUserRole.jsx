// src/coustomHook/useUserRole.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "./useAxiossecure";
import UseAuth from "../context/UseAuth";

const useUserRole = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiossecure();

  const { data: roleData = {}, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  return { role: roleData?.role, loading: isLoading };
};

export default useUserRole;
