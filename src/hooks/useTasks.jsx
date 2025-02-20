// /* eslint-disable no-unused-vars */
// import { useQuery } from "@tanstack/react-query";
// import useSecureAxios from "./useSecureAxios";
// import { AuthContext } from "../providers/AuthProvider";
// import { useContext } from "react";

// const useTasks = () => {
//   const axiosSecure = useSecureAxios();
//   const { user } = useContext(AuthContext);
//   const email = user?.email;

//   const {
//     data: allTasks = [],
//     isPending: loadingTasks,
//     refetch: refetchTasks,
//   } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: async () => {
//       // const res = await axiosSecure.get("/tasks");
//       const res = await axiosSecure.get(`/tasks?email=${email}`);
//       console.log(res);
//       return res.data;
//     },
//   });

//   return [allTasks, loadingTasks, refetchTasks];
// };

// export default useTasks;
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useTasks = () => {
  const axiosSecure = useSecureAxios();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const {
    data: allTasks = [],
    isPending: loadingTasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks", email], // New structure for query key
    queryFn: () =>
      axiosSecure.get(`/tasks?email=${email}`).then((res) => res.data),
    enabled: !!email, // Ensures query runs only when email is available
  });

  return [allTasks, loadingTasks, refetchTasks];
};

export default useTasks;
