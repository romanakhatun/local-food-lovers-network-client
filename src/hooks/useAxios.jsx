import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://local-food-lovers-network-server-sigma.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
