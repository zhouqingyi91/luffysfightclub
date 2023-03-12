import useAuth from "./useAuth";
import { API } from "aws-amplify";
import DashboardApi, { logoutPath } from "../../Api/DashboardApi";


const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await API.get(DashboardApi, logoutPath);
    } catch (err) {
      console.error(err);
    } finally {
      setAuth({});
    }
  }
  return logout;
}

export default useLogout;