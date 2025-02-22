import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const email = user?.email;
  //   console.log(email);

  const { data: userInfo = [], isLoading: loadingUserInfo } = useQuery({
    queryKey: ["users", email],
    queryFn: () =>
      axiosPublic.get(`/user?email=${email}`).then((res) => res.data),
  });

  //   console.log(userInfo);
  return [userInfo, loadingUserInfo];
};

export default useUser;
