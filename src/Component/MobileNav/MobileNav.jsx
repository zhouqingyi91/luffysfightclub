import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import css from './MobileNav.module.css';
import { toggleMobileNavMenu } from '../../Store/mobileNavMenuSlice'

const MobileNav = () => {

  const linkActiveStyle = ({ isActive }) => isActive ? { color: 'white' } : null;
  const mobileNavMenu = useSelector(state => state.mobileNavMenu);
  const dispatch = useDispatch();
  const toggleMenuHandler = () => dispatch(toggleMobileNavMenu());
  return (
    <div id={css.mobileNav}>
      <header className={css.header}>
        <NavLink style={linkActiveStyle} to={'/'} >luffysfightclub</NavLink>
        <Link onClick={toggleMenuHandler}>menu</Link>
      </header>
      {mobileNavMenu &&
        <nav >
          <ul>
            <li>
              <NavLink style={linkActiveStyle} to={'/street'} >street</NavLink>
            </li>
            <li>
              <NavLink style={linkActiveStyle} to={'/portrait'} >portrait</NavLink>
            </li>
          </ul>
        </nav>}
    </div >

  );
};

export default MobileNav;