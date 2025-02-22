import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5001",
  baseURL: "https://taskmanagementapp-psi.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
