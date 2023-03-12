import React, { lazy } from 'react';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PageNotFound from './Component/PageNotFound/PageNotFound';
import RequireAuth from './Component/Authenticated/RequireAuth/RequireAuth';
import TestPage from './Pages/TestPage';

const PortraitPage = lazy(() => import("./Pages/PortraitPage"));
const StreetPage = lazy(() => import("./Pages/StreetPage"));
const DashboardPage = lazy(() => import("./Pages/DashboardPage"));
const Login = lazy(() => import("./Component/Login/Login"));

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/portrait"} element={<PortraitPage />} />
        <Route path={"/street"} element={<StreetPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/test"} element={<TestPage />} />
        <Route path={"*"} element={<PageNotFound />} />

        <Route path={"api"} element={<RequireAuth />}>
          <Route path={"dashboard/*"} element={<DashboardPage />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;