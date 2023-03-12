import MobileNav from '../Component/MobileNav/MobileNav';
import HeaderWrapper from '../Component/HeaderWrapper/HeaderWrapper';
import css from './Layout.module.css';
import LoadingIndicator from '../Component/UI/LoadingIndicator/LoadingIndicator';
import { Suspense } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import useAuth from '../Hooks/Authenticated/useAuth';
import { lazy } from 'react';

const AuthHeaderWrapper = lazy(() => import("../Component/Authenticated/AuthHeaderWrapper/AuthHeaderWrapper"));
const cssOverride = {
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)"
};

const Layout = (props) => {
  const canvasWrapperInnerStyle = { maxWidth: window.screen.width };
  const { auth } = useAuth();
  return (
    <div id={css.canvasWrapper} style={canvasWrapperInnerStyle}>
      <div id={css.canvas}>
        <MobileNav />
        <HeaderWrapper />
        {auth?.accessToken && <AuthHeaderWrapper />}
        <div id={css.page}>
          <LoadingIndicator />
          <Suspense fallback={<BeatLoader color={"#ccc"} size={25} margin={15} cssOverride={cssOverride} />} >
            {props.children}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;