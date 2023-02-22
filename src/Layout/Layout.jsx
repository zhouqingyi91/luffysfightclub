import React, { useEffect } from 'react';
import MobileNav from '../Component/MobileNav/MobileNav';
import HeaderWrapper from '../Component/HeaderWrapper/HeaderWrapper';
import css from './Layout.module.css';
import LoadingIndicator from '../Component/LoadingIndicator/LoadingIndicator';
import { Suspense } from 'react';
import BeatLoader from "react-spinners/BeatLoader";

const Layout = (props) => {
  const canvasWrapperInnerStyle = { maxWidth: window.screen.width };
  return (
    <div id={css.canvasWrapper} style={canvasWrapperInnerStyle}>
      <div id={css.canvas}>
        <MobileNav />
        <HeaderWrapper />

        <div id={css.page}>
          <LoadingIndicator />
          <Suspense fallback={<BeatLoader color={"#ccc"} size={50} margin={30} />} >
            {props.children}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;