import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RectImg.module.css';


const RectImg = ({ imgUrl, path, imageOverlay }) => {
  const navigate = useNavigate();
  const imageOverlayOnClickHandler = () => navigate(path);

  return (
    <div className={css.container}>
      <img src={imgUrl} alt='luffysfightclub' />
      {imageOverlay && <div className={css.imageOverlay}></div>}
      {path &&
        <div onClick={imageOverlayOnClickHandler} className={css.text}>
          <p>{path}</p>
        </div>}
    </div>
  );
};

export default RectImg;