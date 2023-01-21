import React from 'react';
import css from './SquareImg.module.css';

const SquareImg = (props) => {
  return (
    <div className={css.container} style={{ top: props.top, left: props.left, width: props.width }}>
      <img src={props.imgUrl} alt='luffysfightclub' />
    </div>
  );
};

export default SquareImg;