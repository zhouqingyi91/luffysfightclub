import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RectImg.module.css';


const RectImg = ({ imgUrl, path, imageOverlay, ratio, containerWidth }) => {
  const navigate = useNavigate();
  const imageOverlayOnClickHandler = () => navigate(path);
  ratio = ratio ? ratio : "75%";
  containerWidth = containerWidth ? containerWidth : "50%";
  return (
    <div className={css.container} style={{ "--ratio": ratio, "--containerWidth": containerWidth }} >
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