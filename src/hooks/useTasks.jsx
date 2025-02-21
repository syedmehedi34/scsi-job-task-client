import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useTasks = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const {
    data: allTasks = [],
    isLoading: loadingTasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks", email],
    queryFn: () =>
      axiosPublic.get(`/tasks?email=${email}`).then((res) => res.data),
  });

  return [allTasks, loadingTasks, refetchTasks];
};

export default useTasks;
