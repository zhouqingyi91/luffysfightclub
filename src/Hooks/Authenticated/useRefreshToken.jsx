import useAuth from "./useAuth";
import { API } from "aws-amplify";
import DashboardApi, { refreshPath } from "../../Api/DashboardApi";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    // const { accessToken } = await API.get(DashboardApi, refreshPath, { withCredentials: true });
    const { accessToken } = await API.get(DashboardApi, refreshPath);
    setAuth({ accessToken });
    return accessToken;
  }
  return refresh;
};

export default useRefreshToken;