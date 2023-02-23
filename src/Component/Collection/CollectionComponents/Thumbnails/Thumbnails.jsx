import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useElementSize from '../../../../Hooks/useElementSize';
import GalleryImgContainer from '../../GalleryCollection/GalleryImgContainer/GalleryImgContainer';
import css from './Thumbnails.module.css';
import { setSlideIndex } from '../../../../Store/slideIndexSlice';
import { displaySlideshow } from '../../../../Store/slideshowSlice';
import { bucketPathPrefix } from '../../../../Constants/S3/S3BucketConst';

const GRID_GAP = 10;
const MIN_IMG_WIDTH = 312;

const Thumbnails = () => {
  const thumbnailsEle = useRef(null);
  const size = useElementSize(thumbnailsEle);

  // states
  const galleryImgData = useSelector(state => state.galleryImgData);

  const dispatch = useDispatch();

  const goToSlideHandler = (idx) => {
    dispatch(displaySlideshow(true));
    dispatch(setSlideIndex(idx));
  };

  const dynamicPosition = (size) => {
    const totalWidth = size.width;
    const numOfImgPerRow = Math.floor(totalWidth / MIN_IMG_WIDTH);
    const imgWidth = Math.floor((totalWidth - (numOfImgPerRow - 1) * GRID_GAP) / numOfImgPerRow);
    let rowNumber = 0;

    thumbnailsEle.current.style.height = Math.ceil(galleryImgData.length / numOfImgPerRow) * (GRID_GAP + imgWidth) - GRID_GAP + 'px';
    return galleryImgData.map(({ imgName }, idx) => {
      const top = rowNumber * (imgWidth + GRID_GAP);
      const left = (idx % numOfImgPerRow) * (imgWidth + GRID_GAP);
      if ((idx + 1) % numOfImgPerRow === 0) {
        rowNumber += 1;
      }
      return <GalleryImgContainer goToSlide={() => goToSlideHandler(idx)} imgUrl={bucketPathPrefix + imgName} key={idx} top={top} left={left} width={imgWidth} />
    });
  };

  return (
    <div ref={thumbnailsEle} id={css.thumbnails} >
      {size && galleryImgData.length !== 0 && dynamicPosition(size)}
    </div >
  );
};

export default Thumbnails;