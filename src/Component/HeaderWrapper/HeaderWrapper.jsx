import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './HeaderWrapper.module.css';
import { useDispatch } from 'react-redux';
import { displaySlideshow } from '../../Store/slideshowSlice';


const HeaderWrapper = () => {

  const linkActiveStyle = ({ isActive }) => isActive ? { color: 'white' } : null;
  const dispatch = useDispatch();
  return (
    <div id={css.headerWrapper}>
      <header id={css.header}>
        <ul onClick={() => dispatch(displaySlideshow(false))}>
          <li>
            <NavLink style={linkActiveStyle} to={'/'} >luffysfightclub</NavLink>
          </li>
          <li>
            <NavLink style={linkActiveStyle} to={'/street'} >street</NavLink>
          </li>
          <li>
            <NavLink style={linkActiveStyle} to={'/portrait'} >portrait</NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default HeaderWrapper;