import { useState, useRef, useEffect } from 'react';
import css from './Login.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import useAuth from '../../Hooks/Authenticated/useAuth';
import DashboardApi, { loginPath } from '../../Api/DashboardApi';
import { trackPromise } from 'react-promise-tracker';

const Login = () => {

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/api/dashboard";

  const userRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      body: { user, pwd },
      withCredentials: true
    }

    try {
      const accessToken = await trackPromise(API.post(DashboardApi, loginPath, payload));
      setAuth(accessToken)
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log("Error: No Server Response");
      } else if (err.response?.status === 400) {
        console.log("Error: Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log("Error: Unauthorized");
      } else {
        console.log("Error: Login Failed");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </div>
        <div>
          <button>Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Login;