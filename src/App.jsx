import React, { lazy } from 'react';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PageNotFound from './Component/PageNotFound/PageNotFound';

const PortraitPage = lazy(() => import("./Pages/PortraitPage"));
const StreetPage = lazy(() => import("./Pages/StreetPage"));

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/portrait"} element={<PortraitPage />} />
        <Route path={"/street"} element={<StreetPage />} />

        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;