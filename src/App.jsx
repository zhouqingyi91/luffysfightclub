import React from 'react';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PortraitPage from './Pages/PortraitPage';
import StreetPage from './Pages/StreetPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/portrait"} element={<PortraitPage />} />
        <Route path={"/street"} element={<StreetPage />} />
      </Routes>
    </Layout>
  );
};

export default App;