import React from 'react';
import MobileNav from '../Component/MobileNav/MobileNav';
import HeaderWrapper from '../Component/HeaderWrapper/HeaderWrapper';
import css from './Layout.module.css';

const Layout = (props) => {
  return (
    <div id={css.canvasWrapper} style={{ maxWidth: window.screen.width }}>
      <div id={css.canvas}>
        <MobileNav />
        <HeaderWrapper />
        <div id={css.page}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;