import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RectImg.module.css';


const RectImg = (props) => {
  const navigate = useNavigate();
  const imageOverlayOnClickHandler = () => navigate(props.path);

  return (
    <div className={css.container}>
      <img src={props.imgUrl} alt='luffysfightclub' />
      {props.imageOverlay && <div className={css.imageOverlay}></div>}
      {props.path &&
        <div onClick={imageOverlayOnClickHandler} className={css.text}>
          <p>{props.path}</p>
        </div>}
    </div>
  );
};

export default RectImg;