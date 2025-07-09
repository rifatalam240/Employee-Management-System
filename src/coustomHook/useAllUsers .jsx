import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "./useAxiossecure";

const useAllUsers = () => {
  const axiosSecure = useAxiossecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return [users, isLoading, refetch];
};

export default useAllUsers;
