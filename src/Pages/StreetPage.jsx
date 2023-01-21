import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGalleryImgData } from '../Store/galleryImgDataSlice';
import GalleryCollection from '../Component/Collection/GalleryCollection/GalleryCollection';

const IMG_DATA = [
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-10-31-DSCF1328.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-10-31-DSCF1250.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-10-31-DSCF1244.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-09-30-DSCF0607.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-08-25-DSCF9957.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-08-25-DSCF9872.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-08-25-DSCF0015.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-11-DSCF9382.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-11-DSCF9371.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-11-DSCF9370.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-11-DSCF9365.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-11-DSCF9314.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-11-DSCF9171.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-05-DSCF9116.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-05-DSCF9066.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-05-DSCF9009.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-05-DSCF9008.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-05-DSCF8958.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-07-05-DSCF8937.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-06-28-DSCF8919.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-06-28-DSCF8882.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-06-23-DSCF8721.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-06-23-DSCF8693.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-06-07-DSCF8517.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-06-07-DSCF8429.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-06-07-DSCF8356.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-05-23-DSCF8043.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-05-23-DSCF8037.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-05-23-DSCF7941.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-05-23-DSCF7863.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-05-17-DSCF7709.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-11-DSCF7108.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-11-DSCF7085.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-11-DSCF7047.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-11-DSCF6963.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-11-DSCF6962.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-11-DSCF6929.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-07-DSCF6897.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-07-DSCF6832.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-07-DSCF6820.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-07-DSCF6798.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-07-DSCF6768.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-05-DSCF6718.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-02-DSCF6649.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-02-DSCF6646.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-02-DSCF6613.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-02-DSCF6563.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-02-DSCF6523.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-02-DSCF6518.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-02-DSCF6484.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-04-02-DSCF6442.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-03-18-DSCF6267.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-02-20-DSCF6195.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-02-20-DSCF6183.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/22-02-20-DSCF6164.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-12-18-DSCF5621.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-10-30-DSCF5198.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-10-30-DSCF5105.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-10-30-DSCF4964.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-09-19-DSCF4542.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-09-19-DSCF4469.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-09-19-DSCF4420.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-08-08-DSCF3261.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-07-24-DSCF2978.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-06-25-_DSF0772.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-06-20-_DSF0634.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-06-19-_DSF0438.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-06-19-_DSF0160.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-06-18-_DSF9911.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-06-12-_DSF9385.jpg",
  "https://luffysfightclub.s3.us-west-2.amazonaws.com/street/21-06-07-DSCF8899.jpg"
]

const StreetPage = () => {
  // TODO: fetch image data from S3
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGalleryImgData(IMG_DATA));
  })
  return (
    <GalleryCollection />
  );
};

export default StreetPage;