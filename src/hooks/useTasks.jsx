/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useTasks = () => {
  const axiosSecure = useSecureAxios();

  const {
    data: assets = [],
    isPending: loadingTasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      return res.data;
    },
  });

  return [assets, loadingTasks, refetchTasks];
};

export default useTasks;
